import dotenv from "dotenv"

dotenv.config();

const API_VINCULAR_WHAT = process.env.API_VINCULAR_WHAT ;

export const Enviar_Mensajes = async (req,res) => {

    try {


        const Solicitud = await fetch(API_VINCULAR_WHAT, {
            method: "POST",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            },
            body: JSON.stringify({
                Telefono: req.body.Telefono,
                Mensaje: req.body.Mensaje
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
