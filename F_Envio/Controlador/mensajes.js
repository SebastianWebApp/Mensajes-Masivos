import {Leer_Cliente} from "../Servicios/api_crear_cliente.js";
import {Leer_Mensajes} from "../Servicios/api_crear_mensajes.js";
import {Enviar_Mensajes} from "../Servicios/api_vincular_qr.js";

class ServicioFactory {
    static crearServicio(tipo) {
        switch (tipo) {
            case "cliente":
                return new ClienteService();
            case "mensaje":
                return new MensajeService();
            case "envio":
                return new EnvioService();
            default:
                throw new Error("Tipo de servicio desconocido");
        }
    }
}

class BaseService {
    async procesar(req, res, operacion) {
        try {
            const resultado = await operacion(req, res);
            if (resultado.Estado) {
                res.status(200).json({
                    Estado: true,
                    Respuesta: resultado.Respuesta,
                    Contenido: resultado.Contenido
                });
            } else {
                res.status(400).json({
                    Estado: false,
                    Respuesta: resultado.Respuesta
                });
            }
        } catch (error) {
            res.status(500).json({
                Estado: false,
                Respuesta: "Error interno del servidor"
            });
        }
    }
}

class ClienteService extends BaseService {
    async obtener(req, res) {
        return this.procesar(req, res, Leer_Cliente);
    }
}

class MensajeService extends BaseService {
    async obtener(req, res) {
        return this.procesar(req, res, Leer_Mensajes);
    }
}

class EnvioService extends BaseService {
    async enviar(req, res) {
        return this.procesar(req, res, Enviar_Mensajes);
    }
}

export default ServicioFactory;
