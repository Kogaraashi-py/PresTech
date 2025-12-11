# 💰 PresTech - Sistema de Gestión de Préstamos Personales

![PresTech Logo](./ProyectoPresTech/public/Logo_PresTech.png)

**Plataforma web para digitalizar, automatizar y asegurar la gestión de préstamos personales informales**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

[Características](#-características) • [Demo](#-demo) • [Instalación](#-instalación-rápida) • [Tecnologías](#-tecnologías)

</div>

---

## 📖 Acerca de PresTech

PresTech es una solución tecnológica moderna diseñada para **eliminar el uso de registros manuales propensos a errores** en la gestión de préstamos personales informales. La plataforma ofrece **transparencia, control financiero y automatización** completa del proceso de préstamos.

### 🎯 Problema que Resuelve

Los préstamos informales tradicionalmente se registran en cuadernos, hojas de cálculo o métodos manuales que generan:

- ❌ Errores en cálculos de intereses y cuotas
- ❌ Pérdida de información y registros
- ❌ Falta de transparencia entre las partes
- ❌ Disputas por desacuerdos en pagos
- ❌ Gestión ineficiente del tiempo

### ✅ Solución PresTech

PresTech digitaliza y automatiza todo el proceso ofreciendo:

- ✔️ Cálculo automático de intereses, cuotas y amortizaciones
- ✔️ Registro seguro y permanente de todas las transacciones
- ✔️ Transparencia total para prestamistas y prestatarios
- ✔️ Actualización en tiempo real de saldos y estados
- ✔️ Historial completo de pagos y movimientos
- ✔️ Portal web accesible 24/7 desde cualquier dispositivo

---

## ⭐ Características

### 👔 Para el Prestamista

- **📋 Gestión de Clientes**: Registro completo de prestatarios con datos personales y documentos de identidad
- **💼 Configuración de Ofertas**: Crea ofertas personalizadas definiendo tasas de interés, número de cuotas, plazos y condiciones
- **🧮 Cálculo Automático**: El sistema calcula intereses, cuotas mensuales y tablas de amortización automáticamente
- **💵 Control de Pagos**: Registra pagos en tiempo real y actualiza saldos instantáneamente
- **📊 Dashboard Completo**: Vista general de préstamos activos, vencidos, pagados y estadísticas financieras
- **👥 Gestión de Clientes**: Ver historial completo de cada cliente y sus préstamos
- **📈 Seguimiento de Ofertas**: Administra qué ofertas están disponibles o desactivadas

### 👤 Para el Prestatario

- **🏠 Portal Personal**: Dashboard con vista general de todas sus obligaciones
- **💰 Visualización de Deudas**: Ve en tiempo real cuánto debe, cuánto ha pagado y cuánto falta
- **📝 Historial de Pagos**: Consulta detallada de todas las transacciones realizadas con fechas y montos
- **🔍 Detalle de Préstamos**: Información completa de cada préstamo: interés, cuotas, fechas, saldo restante
- **📋 Ofertas Disponibles**: Consulta ofertas de crédito disponibles para solicitar nuevos préstamos
- **🔒 Transparencia Total**: Claridad absoluta sobre intereses, cuotas, plazos y condiciones

### 🤖 Automatización y Funcionalidades

- **⚡ Actualización Automática**: Los estados de cuenta se actualizan instantáneamente con cada transacción
- **🎯 Cálculos Precisos**: Elimina completamente los errores humanos en operaciones matemáticas
- **📑 Registro de Transacciones**: Cada pago queda registrado con fecha, monto y tipo de transacción
- **🔐 Sistema de Autenticación**: Login seguro con roles diferenciados (Prestamista/Prestatario)
- **💾 Respaldos Automáticos**: Sistema de backups de la base de datos
- **🎨 Interfaz Intuitiva**: Diseño moderno y fácil de usar

---

## 🚀 Instalación Rápida

### Requisitos Previos

Asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) 20.10 o superior
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0 o superior
- Git
- Mínimo 4GB de RAM disponible
- 10GB de espacio en disco

### Clonar e Instalar

```bash
# 1. Clonar el repositorio completo
git clone https://github.com/Kogaraashi-py/PresTech
cd PresTech

# 2. Ejecutar el script de instalación automática
chmod +x setup.sh
./setup.sh
```

El script configurará automáticamente:

- ✅ Todos los archivos de configuración de Docker
- ✅ Variables de entorno
- ✅ Permisos necesarios
- ✅ Te preguntará si deseas iniciar los servicios inmediatamente

### Inicio Manual

Si prefieres iniciar manualmente o ya ejecutaste el setup:

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver los logs en tiempo real
docker-compose logs -f
```

### Acceder a la Aplicación

Una vez iniciados los servicios, accede a:

- **🌐 Frontend**: http://localhost:3000
- **🔧 Backend API**: http://localhost:5000
- **📚 Swagger (Documentación API)**: http://localhost:5000/swagger

### Credenciales Iniciales

Para probar la aplicación, puedes crear usuarios desde la interfaz de registro o usar la API directamente.

---

## 🔧 Configuración

### Variables de Entorno

#### Backend

Las variables de entorno están configuradas en `docker-compose.yml`. **Si deseas cambiar la configuración**:

```yaml
backend:
  environment:
    # Cambiar a Production para producción
    - ASPNETCORE_ENVIRONMENT=Development

    # Cambiar la contraseña de la base de datos
    - ConnectionStrings__DefaultConnection=Server=sqlserver,1433;Database=PresTechDataBase;User Id=sa;Password=TU_NUEVA_PASSWORD;TrustServerCertificate=True;
```

#### Frontend

Edita `ProyectoPresTech/.env` si necesitas cambiar la URL del backend:

```env
# Cambiar si el backend está en otro puerto o dominio
VITE_API_URL=http://localhost:5000
```

### Base de Datos

**Credenciales por defecto de SQL Server:**

- **Usuario**: `sa`
- **Contraseña**: `PresTech2024!`
- **Puerto**: `1433`
- **Base de datos**: `PresTechDataBase`

⚠️ **IMPORTANTE para Producción**:

1. **Cambia la contraseña** en `docker-compose.yml`:

```yaml
sqlserver:
  environment:
    - MSSQL_SA_PASSWORD=TuPasswordSegura123!XYZ
```

2. **Actualiza la cadena de conexión** del backend en el mismo archivo.

### Puertos

La aplicación usa estos puertos por defecto:

| Servicio   | Puerto | Acceso                |
| ---------- | ------ | --------------------- |
| Frontend   | 3000   | http://localhost:3000 |
| Backend    | 5000   | http://localhost:5000 |
| SQL Server | 1433   | localhost:1433        |

**Para cambiar puertos**, edita `docker-compose.yml`:

```yaml
frontend:
  ports:
    - "8080:80" # Cambiar 3000 por el puerto deseado

backend:
  ports:
    - "5001:8080" # Cambiar 5000 por el puerto deseado
```

---

## 🛠️ Tecnologías

### Backend

- **ASP.NET Core 9.0** - Framework web moderno y de alto rendimiento
- **Entity Framework Core** - ORM para acceso a base de datos
- **SQL Server 2022** - Sistema de gestión de base de datos
- **Swagger/OpenAPI** - Documentación automática de la API
- **JWT Authentication** - Sistema de autenticación seguro

### Frontend

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Build tool ultrarrápido y dev server
- **React Router** - Navegación y routing
- **Axios** - Cliente HTTP para llamadas a la API
- **CSS Moderno** - Diseño responsive

### DevOps & Infraestructura

- **Docker** - Containerización de aplicaciones
- **Docker Compose** - Orquestación multi-contenedor
- **Nginx** - Servidor web para el frontend en producción

---

## 📦 Estructura del Proyecto

```
PresTech/
├── 📄 docker-compose.yml           # Orquestación de servicios
├── 🔧 setup.sh                     # Script de configuración automática
├── 💾 backups/                     # Backups de base de datos
│
├── 🔙 PresTech-BackEnd/            # Backend ASP.NET Core
│   ├── 🐳 Dockerfile
│   ├── ⚙️ docker-entrypoint.sh
│   ├── PresTechBackEnd/
│   │   ├── Controllers/            # Endpoints de la API
│   │   │   ├── AuthController.cs           # Autenticación
│   │   │   ├── PrestamistaController.cs    # Gestión prestamista
│   │   │   ├── PrestatarioController.cs    # Gestión prestatario
│   │   │   ├── PrestamoController.cs       # Gestión préstamos
│   │   │   ├── OfertaPrestamoController.cs # Ofertas de crédito
│   │   │   ├── TransaccionController.cs    # Pagos y transacciones
│   │   │   ├── PersonaController.cs        # Datos personales
│   │   │   └── TipoDocumentoController.cs  # Tipos de documento
│   │   ├── Models/                 # Modelos de datos
│   │   │   ├── Persona.cs
│   │   │   ├── Prestamista.cs
│   │   │   ├── Prestatario.cs
│   │   │   ├── Prestamo.cs
│   │   │   ├── OfertaPrestamo.cs
│   │   │   ├── Transaccion.cs
│   │   │   └── TipoDocumento.cs
│   │   ├── DTO/                    # Data Transfer Objects
│   │   │   ├── DashboardPrestamistaDTO.cs
│   │   │   ├── DashboardPrestatarioDTO.cs
│   │   │   ├── PrestamoDTO.cs
│   │   │   ├── TransaccionDTO.cs
│   │   │   └── ...
│   │   ├── Data/                   # Contexto de base de datos
│   │   │   └── DbContext.cs
│   │   ├── Migrations/             # Migraciones de EF Core
│   │   ├── Program.cs              # Punto de entrada
│   │   └── appsettings.json        # Configuración
│   └── PresTechBackEnd.sln
│
└── 🎨 ProyectoPresTech/            # Frontend React
    ├── 🐳 Dockerfile
    ├── ⚙️ nginx.conf
    ├── 📦 package.json
    ├── public/
    │   └── Logo_PresTech.png       # Logo de la aplicación
    └── src/
        ├── App.jsx                 # Componente principal
        ├── main.jsx                # Punto de entrada
        ├── components/             # Componentes reutilizables
        │   ├── navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── slidebarprestamista.jsx
        │   └── slidebarprestatario.jsx
        └── pages/                  # Páginas de la aplicación
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Prestamista/        # Vistas del prestamista
            │   ├── PrestamistaDashboard.jsx
            │   ├── PrestamistaClientes.jsx
            │   ├── PrestamistaOfertas.jsx
            │   ├── PrestamistaPrestamos.jsx
            │   ├── PrestamistaTransacciones.jsx
            │   ├── PrestamistaDetalleCliente.jsx
            │   ├── PrestamistaDetallePrestamo.jsx
            │   ├── PrestamistaDetalleOferta.jsx
            │   ├── PrestamistaEditarOferta.jsx
            │   └── PrestamistaOfertaPrestamo.jsx
            └── Prestatario/        # Vistas del prestatario
                ├── PrestatarioDashboard.jsx
                ├── PrestatarioPrestamos.jsx
                ├── PrestatarioHistorial.jsx
                ├── PrestatarioPagos.jsx
                ├── PrestatarioOfertaPrestamo.jsx
                ├── PrestatarioDetallePrestamo.jsx
                └── PrestatarioDetalleOferta.jsx
```

---

## 📚 Comandos Útiles

### Gestión de Servicios

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f sqlserver

# Ver estado de los servicios
docker-compose ps

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina la base de datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend

# Reconstruir las imágenes
docker-compose build --no-cache
docker-compose up -d
```

### Base de Datos

```bash
# Conectar a SQL Server con sqlcmd
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "PresTech2024!"

# Aplicar migraciones de Entity Framework
docker-compose exec backend dotnet ef database update

# Crear una nueva migración
docker-compose exec backend dotnet ef migrations add NombreDeLaMigracion

# Ver migraciones aplicadas
docker-compose exec backend dotnet ef migrations list

# Crear backup manual de la base de datos
docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "PresTech2024!" \
  -Q "BACKUP DATABASE PresTechDataBase TO DISK = '/var/opt/mssql/backup/prestech_$(date +%Y%m%d_%H%M%S).bak'"

# Los backups se guardan en ./backups/
ls -lh backups/
```

### Desarrollo y Debug

```bash
# Entrar al contenedor del backend
docker-compose exec backend bash

# Entrar al contenedor del frontend
docker-compose exec frontend sh

# Ver uso de recursos
docker stats

# Ver redes de Docker
docker network ls
docker network inspect prestech_prestech-network
```

---

## 🔍 Solución de Problemas

### El frontend no carga (http://localhost:3000)

```bash
# Ver logs del frontend
docker-compose logs frontend

# Verificar que el contenedor está corriendo
docker-compose ps

# Reconstruir el frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Verificar que el puerto no está ocupado
sudo lsof -i :3000
```

### El backend no responde

```bash
# Ver logs del backend
docker-compose logs backend

# Verificar conexión a la base de datos
docker-compose logs sqlserver | grep "ready for client connections"

# Reiniciar backend
docker-compose restart backend

# Si el problema persiste, aumentar tiempo de espera
# Editar PresTech-BackEnd/docker-entrypoint.sh
# Cambiar: sleep 15 -> sleep 30
```

### SQL Server no inicia

```bash
# Ver logs completos
docker-compose logs sqlserver

# Verificar memoria disponible (SQL Server necesita mínimo 2GB)
free -h

# Limpiar y reiniciar
docker-compose down -v
docker-compose up -d

# Ver si hay errores de permisos
docker-compose logs sqlserver | grep -i error
```

### Puerto ya en uso

```bash
# Verificar qué proceso está usando el puerto
sudo lsof -i :3000
sudo lsof -i :5000
sudo lsof -i :1433

# Matar el proceso (reemplazar PID)
sudo kill -9 <PID>

# O cambiar el puerto en docker-compose.yml
```

### Error de conexión entre frontend y backend

1. Verifica que la variable de entorno esté correcta:

```bash
cat ProyectoPresTech/.env
# Debe mostrar: VITE_API_URL=http://localhost:5000
```

2. Verifica CORS en el backend (`PresTech-BackEnd/PresTechBackEnd/Program.cs`)

3. Reconstruye el frontend:

```bash
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

---

## 🚀 Despliegue en Producción

### Cambios Necesarios

1. **Actualizar variables de entorno** en `docker-compose.yml`:

```yaml
backend:
  environment:
    - ASPNETCORE_ENVIRONMENT=Production
    - ConnectionStrings__DefaultConnection=Server=sqlserver,1433;Database=PresTechDataBase;User Id=sa;Password=TU_PASSWORD_SEGURA_PRODUCCION;TrustServerCertificate=True;

frontend:
  environment:
    - VITE_API_URL=https://tu-dominio.com/api
```

2. **Cambiar contraseña de SQL Server**:

```yaml
sqlserver:
  environment:
    - MSSQL_SA_PASSWORD=PasswordSeguraProduccion123!XYZ
```

3. **Configurar HTTPS** (recomendado):
   - Usar certificados SSL
   - Configurar proxy inverso (Nginx/Traefik)
   - Usar Let's Encrypt para certificados gratuitos

4. **Crear archivo `.env`** para credenciales sensibles (no subir a Git)

5. **Configurar backups automáticos** de la base de datos

---

## 📖 API Documentation

Una vez que el backend esté corriendo, accede a la documentación interactiva de la API:

**Swagger UI**: http://localhost:5000/swagger

Aquí encontrarás todos los endpoints disponibles, sus parámetros y podrás probar las llamadas directamente desde el navegador.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar PresTech:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👥 Autor

**Hernando Guzman**

- GitHub: [@Kogaraashi-py](https://github.com/Kogaraashi-py)

---

## 🙏 Agradecimientos

- Microsoft por ASP.NET Core y SQL Server
- Equipo de React por la excelente biblioteca
- Comunidad de Docker por simplificar el despliegue
- Todos los contribuidores del proyecto

---

**⭐ Si PresTech te resulta útil, considera darle una estrella al repositorio!**

**💬 ¿Preguntas o sugerencias?** Abre un [issue](https://github.com/Kogaraashi-py/PresTech/issues)
