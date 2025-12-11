#!/bin/bash
# Script de Configuración Automática para PresTech
# Uso: chmod +x setup.sh && ./setup.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   PresTech - Configuración Docker     ║"
echo "╔════════════════════════════════════════╗"
echo -e "${NC}"

# Función para verificar comandos
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar Docker
echo -e "${YELLOW}📋 Verificando dependencias...${NC}"
if ! command_exists docker; then
    echo -e "${RED}❌ Docker no está instalado${NC}"
    echo "Instala Docker: https://docs.docker.com/engine/install/"
    exit 1
fi

if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker Compose no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker instalado${NC}"

# Determinar comando de docker-compose
if command_exists docker-compose; then
    DOCKER_COMPOSE="docker-compose"
else
    DOCKER_COMPOSE="docker compose"
fi

echo -e "${GREEN}✅ Docker Compose: $DOCKER_COMPOSE${NC}\n"

# Verificar estructura
echo -e "${YELLOW}📁 Verificando estructura de carpetas...${NC}"

if [ ! -d "PresTech-BackEnd" ]; then
    echo -e "${RED}❌ Carpeta PresTech-BackEnd no encontrada${NC}"
    echo "Clonando repositorio del backend..."
    git clone https://github.com/JorgeIRamos/PresTech-BackEnd.git
fi

if [ ! -d "ProyectoPresTech" ]; then
    echo -e "${RED}❌ Carpeta ProyectoPresTech no encontrada${NC}"
    echo "Clonando repositorio del frontend..."
    git clone https://github.com/JorgeIRamos/ProyectoPresTech.git
fi

echo -e "${GREEN}✅ Estructura de carpetas OK${NC}\n"

# Crear directorio de backups
mkdir -p backups
echo -e "${GREEN}✅ Directorio de backups creado${NC}\n"

# Crear .dockerignore del backend
echo -e "${YELLOW}📝 Creando archivos de configuración...${NC}"

cat > PresTech-BackEnd/.dockerignore << 'EOF'
**/bin/
**/obj/
**/.vs/
**/.vscode/
**/*.user
**/*.suo
**/node_modules/
**/.git/
**/.gitignore
**/README.md
EOF

# Crear docker-entrypoint.sh del backend
cat > PresTech-BackEnd/docker-entrypoint.sh << 'EOF'
#!/bin/bash
set -e

echo "⏳ Esperando a que SQL Server esté listo..."
sleep 15

echo "🚀 Iniciando aplicación backend..."
exec dotnet PresTechBackEnd.dll
EOF

chmod +x PresTech-BackEnd/docker-entrypoint.sh

# Crear Dockerfile del backend
cat > PresTech-BackEnd/Dockerfile << 'EOF'
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["PresTechBackEnd.sln", "./"]
COPY ["PresTechBackEnd/*.csproj", "PresTechBackEnd/"]

RUN dotnet restore "PresTechBackEnd.sln"

COPY . .

WORKDIR "/src/PresTechBackEnd"
RUN dotnet build "PresTechBackEnd.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PresTechBackEnd.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

COPY ["docker-entrypoint.sh", "./"]
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
EOF

echo -e "${GREEN}✅ Configuración del backend creada${NC}"

# Crear .dockerignore del frontend
cat > ProyectoPresTech/.dockerignore << 'EOF'
node_modules/
npm-debug.log
.git/
.gitignore
README.md
.env.local
.env.development
.env.test
dist/
build/
coverage/
.vscode/
.idea/
EOF

# Crear Dockerfile del frontend
cat > ProyectoPresTech/Dockerfile << 'EOF'
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
EOF

# Crear nginx.conf del frontend
cat > ProyectoPresTech/nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page 404 /index.html;
}
EOF

# Crear .env del frontend
cat > ProyectoPresTech/.env << 'EOF'
VITE_API_URL=http://localhost:5000
EOF

echo -e "${GREEN}✅ Configuración del frontend creada${NC}\n"

# Crear docker-compose.yml
cat > docker-compose.yml << 'EOF'
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: prestech-sqlserver
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=PresTech2024!
      - MSSQL_PID=Developer
    ports:
      - "1433:1433"
    volumes:
      - sqlserver-data:/var/opt/mssql
      - ./backups:/var/opt/mssql/backup
    networks:
      - prestech-network
    restart: unless-stopped

  backend:
    build:
      context: ./PresTech-BackEnd
      dockerfile: Dockerfile
    container_name: prestech-backend
    ports:
      - "5000:8080"
      - "5001:8081"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:8080;https://+:8081
      - ConnectionStrings__DefaultConnection=Server=sqlserver,1433;Database=PresTechDataBase;User Id=sa;Password=PresTech2024!;TrustServerCertificate=True;
    depends_on:
      - sqlserver
    networks:
      - prestech-network
    restart: unless-stopped

  frontend:
    build:
      context: ./ProyectoPresTech
      dockerfile: Dockerfile
    container_name: prestech-frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:5000
    depends_on:
      - backend
    networks:
      - prestech-network
    restart: unless-stopped

volumes:
  sqlserver-data:
    driver: local

networks:
  prestech-network:
    driver: bridge
EOF

echo -e "${GREEN}✅ docker-compose.yml creado${NC}\n"

# Preguntar si desea construir ahora
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}❓ ¿Deseas construir y levantar los contenedores ahora? (s/n)${NC}"
read -r response

if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
    echo ""
    echo -e "${BLUE}🏗️  Construyendo imágenes Docker...${NC}"
    echo -e "${YELLOW}Esto puede tomar varios minutos la primera vez...${NC}\n"
    
    $DOCKER_COMPOSE build
    
    echo ""
    echo -e "${BLUE}🚀 Levantando servicios...${NC}"
    $DOCKER_COMPOSE up -d
    
    echo ""
    echo -e "${BLUE}⏳ Esperando a que los servicios estén listos...${NC}"
    sleep 15
    
    echo ""
    echo -e "${BLUE}📊 Estado de los servicios:${NC}"
    $DOCKER_COMPOSE ps
    
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ ¡Configuración completada exitosamente!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${BLUE}🌐 Accede a tu aplicación en:${NC}"
    echo -e "   ${GREEN}Frontend:${NC}  http://localhost:3000"
    echo -e "   ${GREEN}Backend:${NC}   http://localhost:5000"
    echo -e "   ${GREEN}Swagger:${NC}   http://localhost:5000/swagger"
    echo ""
    echo -e "${BLUE}📋 Comandos útiles:${NC}"
    echo -e "   ${YELLOW}Ver logs:${NC}      $DOCKER_COMPOSE logs -f"
    echo -e "   ${YELLOW}Detener:${NC}       $DOCKER_COMPOSE down"
    echo -e "   ${YELLOW}Reiniciar:${NC}     $DOCKER_COMPOSE restart"
    echo -e "   ${YELLOW}Estado:${NC}        $DOCKER_COMPOSE ps"
    echo ""
    
    # Verificar salud
    echo -e "${BLUE}🏥 Verificando conectividad...${NC}"
    sleep 5
    
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ Frontend está respondiendo${NC}"
    else
        echo -e "${YELLOW}⚠️  Frontend aún no responde, espera unos segundos más${NC}"
    fi
    
    if curl -s http://localhost:5000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend está respondiendo${NC}"
    else
        echo -e "${YELLOW}⚠️  Backend aún no responde, espera unos segundos más${NC}"
    fi
    
else
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Configuración completada${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}Para construir y levantar los servicios más tarde, ejecuta:${NC}"
    echo -e "   ${BLUE}$DOCKER_COMPOSE build${NC}"
    echo -e "   ${BLUE}$DOCKER_COMPOSE up -d${NC}"
fi

echo ""
echo -e "${BLUE}📖 Para más información, revisa el archivo de documentación${NC}"
echo ""
