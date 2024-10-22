# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app


# Elimina node_modules y package-lock.json si existen
RUN rm -rf node_modules package-lock.json

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de npm
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Expone el puerto 3000 para el servidor de desarrollo de React
EXPOSE 5173

# Inicia la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]