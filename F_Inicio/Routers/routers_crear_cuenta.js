import { Router } from 'express';
import {Nueva_Cuenta, Verificar_Credenciales, Extraer_Credenciales, Actualizar_Cuenta} from "../Controlador/login.js";
const router_crear_cuenta = Router();


// Iniciar Sesion
router_crear_cuenta.post('/Nueva_Cuenta', Nueva_Cuenta);
router_crear_cuenta.post('/Verificar_Credenciales',Verificar_Credenciales);
router_crear_cuenta.post('/Extraer_Credenciales',Extraer_Credenciales);
router_crear_cuenta.post('/Actualizar_Credenciales',Actualizar_Cuenta);


export default router_crear_cuenta;
