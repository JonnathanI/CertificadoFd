# Imagen base para Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Compila el proyecto (puedes usar `expo build` si es necesario)
RUN npm run build

# Expone el puerto 3000 (o el puerto que uses para el frontend)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
