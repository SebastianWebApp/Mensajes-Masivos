FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /F_QR

COPY . .

RUN npm install

EXPOSE 3006

CMD ["npm","start"]