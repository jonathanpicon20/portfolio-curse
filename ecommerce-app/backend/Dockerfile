# Usamos Node.js 20 (última versión estable)
FROM node:24-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto que usa el backend
EXPOSE 3000

# Comando para correr la app en modo producción
CMD ["npm", "run", "start:prod"]
