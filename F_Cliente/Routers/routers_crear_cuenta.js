import { Router } from 'express';
import {Leer, Crear, Actualizar, Eliminar } from "../Controlador/mensajes.js";
const router_crear_cuenta = Router();


// mensajes
router_crear_cuenta.get('/Cliente', Leer);
router_crear_cuenta.post('/Cliente',Crear);
router_crear_cuenta.put('/Cliente',Actualizar);
router_crear_cuenta.delete('/Cliente',Eliminar);


export default router_crear_cuenta;
