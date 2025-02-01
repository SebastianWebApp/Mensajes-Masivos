FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /F_Mensaje

COPY . .

RUN npm install

EXPOSE 3028

CMD ["npm","start"]