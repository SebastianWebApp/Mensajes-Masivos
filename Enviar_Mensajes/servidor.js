import express, { json } from 'express';
import pkg from 'whatsapp-web.js';
import { toDataURL } from 'qrcode';
import puppeteer from 'puppeteer';

const { Client, LocalAuth } = pkg;
const app = express();
app.use(json());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Puedes cambiar a 'new' si sigue fallando
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium', // Ruta de Chromium
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    }
});

let qrCodeUrl = null; // Variable para almacenar el QR temporalmente

client.on('qr', (qr) => {
    // Generar el QR en formato de data URL
    toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Error generando el QR:', err);
        } else {
            qrCodeUrl = url; // Guardar el URL del QR
        }
    });
});

client.on('ready', () => {
    console.log('WhatsApp Web conectado y listo para enviar mensajes.');
    qrCodeUrl = null; // Limpiar el QR cuando el cliente esté listo
});

client.on('auth_failure', (msg) => {
    console.error('Fallo de autenticación:', msg);
});

// Inicializar cliente de WhatsApp
client.initialize();

// Ruta para mostrar el QR en el navegador
app.get('/', (req, res) => {
    if (qrCodeUrl) {

        res.status(200).json({

            Estado: true,
            Respuesta: "Escanea el código QR desde WhatsApp para iniciar sesión",
            Contenido: qrCodeUrl

        });
        
        return; 

    } else {       
        res.status(400).json({

            Estado: false,
            Respuesta: "Si ya estás conectado, no se mostrará un QR."

        });
        
        return;
    }
});

// Endpoint para enviar mensajes
app.post('/', async (req, res) => {
    const { Telefono, Mensaje } = req.body;


    if (!Telefono || !Mensaje) {
        return res.status(400).json({ error: 'Se requiere Telefono y Mensaje.' });
    }

    const chatId = `${Telefono}@c.us`; // Formato requerido por WhatsApp
    try {
        await client.sendMessage(chatId, Mensaje);

        res.status(200).json({

            Estado: true,
            Respuesta: "Mensaje enviado correctamente."

        });
        
        return; 

    } catch (error) {
        res.status(400).json({

            Estado: false,
            Respuesta: "No se pudo enviar el mensaje."

        });
        
        return; 
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
