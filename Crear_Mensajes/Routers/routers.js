import { Router } from "express";
import {
    Leer_Mensaje,
    Crear_Nuevo_Mensaje,
    Actualizar_Mensaje,
    Eliminar_Mensaje
} from "../Controladores/operaciones.js";

const router = Router();

// Rutas para mensajes
router.get("/Mensaje", Leer_Mensaje);  // Leer mensaje por ID

router.post("/Mensaje", Crear_Nuevo_Mensaje);  // Crear un nuevo mensaje

router.put("/Mensaje", Actualizar_Mensaje);  // Actualizar un mensaje existente

router.delete("/Mensaje/:Id", Eliminar_Mensaje);  // Eliminar mensaje por ID

export default router;

