FROM node:22-bullseye

# Dirección de la carpeta donde esta el Dockerfile
WORKDIR /F_Cliente

COPY . .

RUN npm install

EXPOSE 3010

CMD ["npm","start"]