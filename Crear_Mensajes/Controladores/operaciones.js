import { Leer, Crear, Actualizar, Eliminar } from "../Servicios/crud.js";

export const Leer_Mensaje = async (req, res) => {
    const Leer_Mensaje = await Leer(req, res);

    if (Leer_Mensaje.Estado) {
        res.status(200).json({
            Estado: Leer_Mensaje.Estado,
            Respuesta: Leer_Mensaje.Respuesta,
            Contenido: Leer_Mensaje.Contenido
        });
    } else {
        res.status(400).json({
            Estado: Leer_Mensaje.Estado,
            Respuesta: Leer_Mensaje.Respuesta,
        });
    }
};

export const Crear_Nuevo_Mensaje = async (req, res) => {
    const Crear_Mensaje = await Crear(req, res);

    if (Crear_Mensaje.Estado) {
        res.status(Crear_Mensaje.Status).json({
            Estado: Crear_Mensaje.Estado,
            Respuesta: Crear_Mensaje.Respuesta
        });
    } else {
        res.status(Crear_Mensaje.Status).json({
            Estado: Crear_Mensaje.Estado,
            Respuesta: Crear_Mensaje.Respuesta
        });
    }
};

export const Actualizar_Mensaje = async (req, res) => {
    const Actualizar_Mensaje_Info = await Actualizar(req, res);

    if (Actualizar_Mensaje_Info.Estado) {
        res.status(Actualizar_Mensaje_Info.Status).json({
            Estado: Actualizar_Mensaje_Info.Estado,
            Respuesta: Actualizar_Mensaje_Info.Respuesta
        });
    } else {
        res.status(Actualizar_Mensaje_Info.Status).json({
            Estado: Actualizar_Mensaje_Info.Estado,
            Respuesta: Actualizar_Mensaje_Info.Respuesta
        });
    }
};

export const Eliminar_Mensaje = async (req, res) => {
    const Eliminar_Mensaje_Info = await Eliminar(req, res);

    if (Eliminar_Mensaje_Info.Estado) {
        res.status(Eliminar_Mensaje_Info.Status).json({
            Estado: Eliminar_Mensaje_Info.Estado,
            Respuesta: Eliminar_Mensaje_Info.Respuesta
        });
    } else {
        res.status(Eliminar_Mensaje_Info.Status).json({
            Estado: Eliminar_Mensaje_Info.Estado,
            Respuesta: Eliminar_Mensaje_Info.Respuesta
        });
    }
};
