import { Router } from 'express';
import {Leer_Men, Crear_Men, Actualizar_Men, Eliminar_Men } from "../Controlador/mensajes.js";
const router_crear_cuenta = Router();


// mensajes
router_crear_cuenta.get('/Mensaje', Leer_Men);
router_crear_cuenta.post('/Mensaje',Crear_Men);
router_crear_cuenta.put('/Mensaje',Actualizar_Men);
router_crear_cuenta.delete('/Mensaje/:Id',Eliminar_Men);


export default router_crear_cuenta;
