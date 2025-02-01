import {Leer_Mensajes} from "../Servicios/api_vincular_qr.js";
export const Leer_Men= async(req, res) =>{

    const Mensajes_Existentes = await Leer_Mensajes(req,res);
  
    if(Mensajes_Existentes.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Mensajes_Existentes.Respuesta,
            Contenido: Mensajes_Existentes.Contenido

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Mensajes_Existentes.Respuesta

        });
        
        return; 
    }


}
