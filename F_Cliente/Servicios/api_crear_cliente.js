import dotenv from "dotenv"

dotenv.config();

const API_CREAR_USUARIO = process.env.API_CREAR_USUARIO ;

export const Leer_Cliente = async (req,res) => {

    try {


        const Solicitud = await fetch(API_CREAR_USUARIO, {
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta,
                Contenido: Respuesta_Servidor.Contenido
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}
export const Crear_Cliente = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_USUARIO, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Nombre: req.body.Nombre,
                Telefono: req.body.Telefono,
                Fecha_nacimiento: req.body.Fecha_nacimiento,
                Ocupacion: req.body.Ocupacion
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}
export const Actualizar_Cliente = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_USUARIO + req.body.Id , {
            method: "PUT",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Nombre: req.body.Nombre,
                Telefono: req.body.Telefono,
                Fecha_nacimiento: req.body.Fecha_nacimiento,
                Ocupacion: req.body.Ocupacion
            })
            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}
export const Eliminar_Cliente = async (req,res) => {
    try {
        const Solicitud = await fetch(API_CREAR_USUARIO + req.body.Id, {
            method: "DELETE",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }            
        });
    
        const Respuesta_Servidor = await Solicitud.json();
    
        if(Respuesta_Servidor.Estado){
    
            return {
    
                Estado: true,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };
        }
    
        else{
            
            return {
    
                Estado: false,
                Respuesta: Respuesta_Servidor.Respuesta
    
            };

        }
        
    } catch (error) {
          
        return {
    
            Estado: false,
            Respuesta: "intente de nuevo"

        };
    }
    
}