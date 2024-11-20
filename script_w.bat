@echo off
:: Variables
set REPO_URL=https://github.com/JorgeManuelManzanoA/K5.git
set REPO_DIR=K5
set PRIVATE_IP=%1
set PUBLIC_IP=%2
if "%PRIVATE_IP%"=="" set PRIVATE_IP=127.0.0.1
if "%PUBLIC_IP%"=="" set PUBLIC_IP=localhost
set STACK_NAME=tesis
set NETWORK_NAME=app-network

:: 1. Verificar si Docker Swarm está iniciado
docker info | findstr "Swarm: active" >nul
if %ERRORLEVEL% neq 0 (
    echo Docker Swarm no está iniciado. Iniciando con IP privada: %PRIVATE_IP%...
    docker swarm init --advertise-addr %PRIVATE_IP%
) else (
    echo Docker Swarm ya está iniciado.
)

:: 2. Verificar si la red overlay ya existe
docker network ls | findstr %NETWORK_NAME% >nul
if %ERRORLEVEL% neq 0 (
    echo Creando la red %NETWORK_NAME%...
    docker network create -d overlay %NETWORK_NAME%
) else (
    echo La red %NETWORK_NAME% ya existe.
)

:: 3. Clonar o actualizar el repositorio
if exist "%REPO_DIR%" (
    echo El repositorio ya existe. Actualizando...
    cd %REPO_DIR% && git pull && cd ..
) else (
    echo Clonando el repositorio...
    git clone %REPO_URL%
)

:: 4. Moverse al directorio del repositorio
cd %REPO_DIR%

:: 5. Reemplazar la URL del backend en el frontend
powershell -Command "(gc .\frontend\src\environments\environment.prod.ts) -replace 'http://.*:3000', 'http://%PUBLIC_IP%:3000' | sc .\frontend\src\environments\environment.prod.ts"

:: 6. Construir imágenes de Docker
docker build -t backend-app:latest .\backend
docker build -t frontend-app:latest .\frontend

:: 7. Desplegar la aplicación usando Docker Stack
docker stack deploy -c docker-compose.yml %STACK_NAME%

:: Mensaje final
echo La aplicación ha sido desplegada con el backend en: http://%PUBLIC_IP%:3000
pause
