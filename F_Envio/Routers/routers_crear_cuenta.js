import { Router } from 'express';
import ServicioFactory from "../Controlador/mensajes.js";

const router_crear_cuenta = Router();

router_crear_cuenta.get('/Cliente', async (req, res) => {
    const servicio = ServicioFactory.crearServicio("cliente");
    await servicio.obtener(req, res);
});

router_crear_cuenta.get('/Mensaje', async (req, res) => {
    const servicio = ServicioFactory.crearServicio("mensaje");
    await servicio.obtener(req, res);
});

router_crear_cuenta.post('/Enviar', async (req, res) => {
    const servicio = ServicioFactory.crearServicio("envio");
    await servicio.enviar(req, res);
});

export default router_crear_cuenta;
