import {Leer_Usuarios_Existentes, Crear_Nuevo_Usuario, Leer_Credenciales, Actualizar_Usuario} from "../Servicios/api_inicio_sesion.js";



export const Nueva_Cuenta = async (req, res) => {



    const Usuarios_Existentes = await Leer_Usuarios_Existentes(req,res);
  
    if(Usuarios_Existentes.Estado){
        res.status(400).json({

            Estado: false,
            Respuesta: Usuarios_Existentes.Respuesta

        });
        
        return; 
    }

    if(Usuarios_Existentes.Respuesta == "intente de nuevo"  ||  Usuarios_Existentes.Respuesta == "Error al leer la base de datos, intente de nuevo"){
        res.status(400).json({

            Estado: false,
            Respuesta: Usuarios_Existentes.Respuesta

        });
        
        return; 
    }



    const Crear_Usuario = await Crear_Nuevo_Usuario(req,res);

    if(Crear_Usuario.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Crear_Usuario.Respuesta

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Crear_Usuario.Respuesta

        });
        
        return; 
    }




}

export const Verificar_Credenciales = async (req,res) => {


    const Verificar = await Leer_Credenciales(req,res);
  
    if(Verificar.Estado){

      

        res.status(200).json({

            Estado: true,
            Respuesta: Verificar.Respuesta

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Verificar.Respuesta

        });
        
        return; 
    }

    
}

export const Extraer_Credenciales = async(req, res) =>{

    const Usuarios_Existentes = await Leer_Usuarios_Existentes(req,res);
  
    if(Usuarios_Existentes.Estado){
        res.status(200).json({

            Estado: true,
            Respuesta: Usuarios_Existentes.Respuesta,
            Contenido: Usuarios_Existentes.Contenido

        });
        
        return; 
    }
    else{
        res.status(400).json({

            Estado: false,
            Respuesta: Usuarios_Existentes.Respuesta

        });
        
        return; 
    }


}

export const Actualizar_Cuenta = async(req, res) =>{

    const Actualizar = await Actualizar_Usuario(req,res);

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