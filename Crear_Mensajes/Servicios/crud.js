import  connectToDB  from "../Database/conectar.js";
import dotenv from "dotenv";
dotenv.config();

export const Leer = async (req, res) => {
       try {
        // Ejecuta el procedimiento almacenado 'Mensaje_Leer'
        const [rows] = await connectToDB.query("CALL Mensaje_Leer()");
return {
        Estado: true,
        Respuesta: "El mensaje fue encontrado",
        Contenido:rows[0]
               };
    } catch (error) {
        // Error al leer la base de datos
        return {
            Estado: false,
            Respuesta: "Error al leer la base de datos, intente de nuevo",
        };
    }
};

export const Crear = async (req, res) => {
    const Parametros = req.body;

    try {
        // Verificar si el 'Texto' está presente en los parámetros de la solicitud
        if (Parametros.Texto) {

            // Realizar la inserción en la base de datos usando el procedimiento almacenado
            const [result] = await connectToDB.query("CALL Mensaje_Crear(?)", [
                Parametros.Texto,
            ]);

            // Respuesta en caso de éxito
            return {
                Estado: true,
                Respuesta: "Se creó correctamente el mensaje",
                Status: 200
            };

        } else {
            // Respuesta si 'Texto' no está presente o es inválido
            return {
                Estado: false,
                Respuesta: "Texto no proporcionado o no válido",
                Status: 400
            };
        }

    } catch (error) {
        // Respuesta en caso de error al intentar crear el mensaje
        return {
            Estado: false,
            Respuesta: "Error al crear el mensaje, intente de nuevo",
            Status: 400
        };
    }
};

export const Actualizar = async (req, res) => {
    const { Id, Texto } = req.body; // Desestructuración de los parámetros

    try {
        // Verificar si ambos 'Id' y 'Texto' están presentes
        if (Id && Texto) {

            // Realizar la actualización en la base de datos usando el procedimiento almacenado
            const [result] = await connectToDB.query("CALL Mensaje_Actualizar(?, ?)", [
                Id, 
                Texto
            ]);

            // Respuesta en caso de éxito
            return {
                Estado: true,
                Respuesta: "El mensaje fue actualizado correctamente",
                Status: 200
            };

        } else {
            // Respuesta si 'Id' o 'Texto' no están presentes
            return {
                Estado: false,
                Respuesta: "'Id' y/o 'Texto' son necesarios",
                Status: 400
            };
        }

    } catch (error) {
        // Respuesta en caso de error al intentar actualizar el mensaje
        return {
            Estado: false,
            Respuesta: "Error al actualizar el mensaje, intente de nuevo",
            Status: 400
        };
    }
};

 export const Eliminar = async (req, res) => {
        
    const { Id } = req.params; // Obtener el Id desde los parámetros de la URL
        try {
         // Llamar al procedimiento almacenado para eliminar el mensaje con el Id
         const [result] = await connectToDB.query("CALL Mensaje_Eliminar(?)", [Id]);
        // Verificar si la eliminación fue exitosa
         if (result.affectedRows > 0) {
             return {
                 Estado: true,
                 Respuesta: "Mensaje eliminado correctamente",
                 Status: 200
             };
             } else {
                 return {
                 Estado: false,
                 Respuesta: "Mensaje no encontrado",
                 Status: 404
             };
         }
    } catch (error) {
         return {
             Estado: false,
             Respuesta: "Intente de nuevo, error al eliminar el mensaje",
             Status: 400
         };
     }
 };