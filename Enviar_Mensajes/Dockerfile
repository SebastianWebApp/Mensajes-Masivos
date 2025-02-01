FROM node:18

# Instalar dependencias necesarias para Puppeteer y Chromium
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libpango1.0-0 \
    libcurl4 \
    xvfb \
    chromium

# Crear directorio de la app
WORKDIR /Enviar_Mensajes

# Copiar archivos y paquetes
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Configurar Puppeteer sin sandbox (importante en Docker)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_BIN=/usr/bin/chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox"

# Exponer puerto (si usas Express o WebSocket)
EXPOSE 3005

# Comando de inicio
CMD ["npm", "start"]
