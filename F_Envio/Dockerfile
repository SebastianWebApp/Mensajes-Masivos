FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /F_Envio

COPY . .

RUN npm install

EXPOSE 3004

CMD ["npm","start"]