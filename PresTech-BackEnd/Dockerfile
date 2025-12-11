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
