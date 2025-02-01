import express, { json } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath, pathToFileURL } from "url";
import router_crear_cuenta from "./Routers/routers_crear_cuenta.js";

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;

// Obtenemos la dirección de los elementos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Iniciamos express
const app = express();

//Middlewares
app.use(cors()); // Permite la conexión entre el Front y el Backend

app.use(json()); // Parear JSON en las solicitudes


// Permite mostrar la página web segun la ruta
app.use(express.static(path.join(__dirname)));


// ---------------------- Mensajes ------------------------------

app.get("/QR", (req,res) =>{
    res.sendFile(path.join(__dirname,"views","QR.html"));
});

// ---------------------- Gateway ------------------------------
app.use("/api/QR_what",router_crear_cuenta);

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});
