import dotenv from "dotenv"

dotenv.config();

const API_CREAR_MENSAJES = process.env.API_CREAR_MENSAJES ;

export const Leer_Mensajes = async (req,res) => {

    try {


        const Solicitud = await fetch(API_CREAR_MENSAJES, {
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
export const Crear_Mensajes = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_MENSAJES, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Texto: req.body.Texto
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
export const Actualizar_Mensajes = async (req,res) => {

    try {

        const Solicitud = await fetch(API_CREAR_MENSAJES , {
            method: "PUT",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Texto: req.body.Texto,
                Id: req.body.Id
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
export const Eliminar_Mensajes = async (req,res) => {
    try {
        const Solicitud = await fetch(API_CREAR_MENSAJES +"/"+ req.params.Id, {
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