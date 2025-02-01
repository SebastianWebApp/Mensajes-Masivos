import {Leer_Mensajes, Crear_Mensajes, Actualizar_Mensajes, Eliminar_Mensajes} from "../Servicios/api_crear_mensajes.js";
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
export const Crear_Men = async (req, res) => {
      const Crear = await Crear_Mensajes(req,res);
    if(Crear.Estado){
        res.status(200).json({
            Estado: true,
            Respuesta: Crear.Respuesta
        });
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Crear.Respuesta
        });
        return; 
    }
}

export const Actualizar_Men = async(req, res) =>{


    const Actualizar = await Actualizar_Mensajes (req,res);

    if(Actualizar.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Actualizar.Respuesta,

        });
        
        return; 

    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Actualizar.Respuesta,

        });
        
        return; 
    }


}

export const Eliminar_Men = async (req,res) => {
    const Eliminar = await Eliminar_Mensajes (req,res);
      if(Eliminar.Estado){
        res.status(200).json({
            Estado: true,
            Respuesta: Eliminar.Respuesta
        });
        return; 
    }
    else{
        res.status(400).json({
            Estado: false,
            Respuesta: Eliminar.Respuesta
        });
        return; 
    }
}

