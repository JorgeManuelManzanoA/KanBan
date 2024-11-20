#!/bin/bash

# Variables
REPO_URL="https://github.com/JorgeManuelManzanoA/K5.git"
REPO_DIR="K5"
PRIVATE_IP=${1:-"127.31.17.38"} # IP privada para Docker Swarm
PUBLIC_IP=${2:-"localhost"}  # IP pública para la URL de la aplicación
STACK_NAME="tesis"
NETWORK_NAME="app-network"

# 1. Verificar si Docker Swarm está iniciado
if ! docker info | grep -q "Swarm: active"; then
    echo "Docker Swarm no está iniciado. Iniciando con IP privada: $PRIVATE_IP..."
    sudo docker swarm init --advertise-addr "$PRIVATE_IP"
else
    echo "Docker Swarm ya está iniciado."
fi

# 2. Verificar si la red overlay ya existe
if docker network ls | grep -q "$NETWORK_NAME"; then
    echo "La red $NETWORK_NAME ya existe."
else
    echo "Creando la red $NETWORK_NAME..."
    sudo docker network create -d overlay "$NETWORK_NAME"
fi

# 3. Clonar o actualizar el repositorio
if [ -d "$REPO_DIR" ]; then
    echo "El repositorio ya existe. Actualizando..."
    cd "$REPO_DIR" && git pull && cd ..
else
    echo "Clonando el repositorio..."
    git clone "$REPO_URL"
fi

# 4. Moverse al directorio del repositorio
cd "$REPO_DIR" || exit

# 5. Reemplazar la URL del backend en el frontend
sed -i "s|http://.*:3000|http://${PUBLIC_IP}:3000|g" "./frontend/src/environments/environment.prod.ts"

# 6. Construir imágenes de Docker
sudo docker build -t backend-app:latest ./backend
sudo docker build -t frontend-app:latest ./frontend

# 7. Desplegar la aplicación usando Docker Stack
sudo docker stack deploy -c docker-compose.yml "$STACK_NAME"

# Mensaje final
echo "La aplicación ha sido desplegada con el backend en: http://${PUBLIC_IP}:3000"
