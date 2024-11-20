Proyecto KanBan
Este proyecto implementa una solución de tablero KanBan utilizando tecnologías modernas que permiten la escalabilidad, el monitoreo y un flujo de trabajo eficiente en equipos de desarrollo.

Este proyecto emplea las siguientes tecnologías:
- Docker Swarm: Plataforma de orquestación para administrar servicios en contenedores distribuidos.
- Angular: Framework para construir interfaces de usuario dinámicas y responsivas.
- Node.js: Entorno de ejecución para construir el backend del sistema.
- Nginx: Servidor web para servir la aplicación Angular y actuar como un proxy inverso.
- Prometheus: Herramienta para monitorear métricas del sistema y generar alertas.
- Redis: Base de datos en memoria para almacenamiento en caché y comunicación entre servicios.
- MongoDB: Base de datos NoSQL para almacenar datos persistentes del sistema.

Configuración del Proyecto
- Para Windows:
  1. Ejecuta el siguiente comando en la terminal de Windows (PowerShell o CMD) para desplegar el sistema:
     .\deploy.bat
- Para Linux:
  1. Inicia Docker Swarm especificando tu dirección IP de red:
     docker swarm init --advertise-addr 192.168.0.8
     Asegúrate de reemplazar 192.168.0.8 con la IP correspondiente de tu máquina.
  2. Otorga permisos de ejecución al script:
     chmod +x script.sh
  3.Ejecuta el script para desplegar los servicios:
    ./script.sh

Estructura del Proyecto
El proyecto está estructurado de la siguiente manera:
- Frontend (Angular): Carpeta frontend/, contiene el código para la interfaz de usuario.
- Backend (Node.js): Carpeta backend/, incluye la API REST para la lógica del negocio.
- Docker Configuration: Archivos docker-compose.yml y scripts para gestionar la orquestación en Docker Swarm.
- Monitorización (Prometheus y Redis): Servicios configurados para métricas y caché de datos.
- Base de Datos (MongoDB): Configuración de la base de datos para el almacenamiento persistente.

Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de contar con:
- Docker y Docker Compose instalados.
- Una red configurada para Docker Swarm (solo en Linux).
- Acceso a puertos necesarios (por defecto: 80, 8080, 3000, 27017).
- Git instalado para clonar el repositorio.

Despliegue Paso a Paso
1. Clona el repositorio:
   git clone https://github.com/JorgeManuelManzanoA/Tesis-KanBan.git
   cd Tesis-KanBan
2. Configura las variables de entorno:
Copia el archivo .env.example a .env y modifica las variables según sea necesario:
  cp .env.example .env
3. Inicia los servicios:
   - En Windows:
    .\deploy.bat
   - En Linux:
     docker swarm init --advertise-addr [Tu_IP]
     chmod +x script.sh
     ./script.sh
