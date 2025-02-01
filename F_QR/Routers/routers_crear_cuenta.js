import { Router } from 'express';
import {Leer_Men} from "../Controlador/mensajes.js";
const router_crear_cuenta = Router();


// mensajes
router_crear_cuenta.get('/QR', Leer_Men);



export default router_crear_cuenta;
