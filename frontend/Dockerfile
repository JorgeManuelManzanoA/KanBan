# Usa una imagen base de Node.js para construir la aplicación
FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación en modo producción
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación en producción
FROM nginx:alpine
    
# Copia los archivos estáticos construidos en la fase anterior al directorio de Nginx
COPY --from=build /app/dist/kanban /usr/share/nginx/html

# Expone el puerto 80 para el servidor Nginx
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
