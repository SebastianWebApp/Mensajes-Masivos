import {Leer_Cliente, Crear_Cliente, Actualizar_Cliente, Eliminar_Cliente} from "../Servicios/api_crear_cliente.js";

export const Leer = async(req, res) =>{

    const Leer_C = await Leer_Cliente(req,res);
  
    if(Leer_C.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Leer_C.Respuesta,
            Contenido: Leer_C.Contenido

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Leer_C.Respuesta

        });
        
        return; 
    }


}
export const Crear = async (req, res) => {

    const Crear_C = await Crear_Cliente(req,res);
    if(Crear_C.Estado){
        res.status(200).json({
            Estado: true,
            Respuesta: Crear_C.Respuesta
        });
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Crear_C.Respuesta
        });
        return; 
    }
}

export const Actualizar = async(req, res) =>{


    const Actualizar_C = await Actualizar_Cliente (req,res);

    if(Actualizar_C.Estado){

        res.status(200).json({

            Estado: true,
            Respuesta: Actualizar_C.Respuesta,

        });
        
        return; 

    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Actualizar_C.Respuesta,

        });
        
        return; 
    }


}

export const Eliminar = async (req,res) => {
    const Eliminar_C = await Eliminar_Cliente (req,res);
      if(Eliminar_C.Estado){
        res.status(200).json({
            Estado: true,
            Respuesta: Eliminar_C.Respuesta
        });
        return; 
    }
    else{
        res.status(400).json({
            Estado: false,
            Respuesta: Eliminar_C.Respuesta
        });
        return; 
    }
}

