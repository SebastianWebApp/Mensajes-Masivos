import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import {Todo} from "./modules/todo.model.js";

//Permite la comunicacion con el .env
dotenv.config();

const app = express();
const port = process.env.PORT;

//middReware
app.use(express.json());

connectToDB();

//Leer todos
app.get("/", async(req,res) => {

    try {
        
        const resultado = await Todo.find();
        res.status(200).json({

            Estado: true,
            Respuesta: "Lista de Mensajes",
            Contenido: resultado

        });
        
        return; 
       

    } catch (error) {
        

        res.status(400).json({

            Estado: false,
            Respuesta: "Error al leer la base, intente de nuevo"

        });
        
        return; 
    }
})

//Crear uno nuevo
app.post("/", async (req,res) =>{
    const todoDetails  = req.body;
    try {
        const resultado = await Todo.create(todoDetails);
      
        res.status(200).json({

            Estado: true,
            Respuesta: "Cliente creado correctamente"

        });
        
        return; 

    } catch (error) {
      

        res.status(400).json({

            Estado: false,
            Respuesta: "Error al crear el cliente, intente de nuevo"

        });
        
        return; 
    }
})


//Actualizar por medio del ID
app.put("/:Id", async (req,res) => {

    const todoId = req.params.Id;
    const updatedTodo = req.body;

    try {
        
        const resultado = await Todo.findByIdAndUpdate(todoId,updatedTodo,{
            new: true
        });

      

        res.status(200).json({

            Estado: true,
            Respuesta: "Cliente actualizado correctamente"

        });
        
        return; 


    } catch (error) {

        res.status(400).json({

            Estado: false,
            Respuesta: "Error al actualizar el cliente"

        });
        
        return; 
    }


})

//Eliminar por ID
app.delete("/:Id", async (req, res) => {

    const TodoId = req.params.Id;

    try {
        
        const Resultado = await Todo.findByIdAndDelete(TodoId);

        res.status(200).json({

            Estado: true,
            Respuesta: "Cliente eliminado correctamente" 

        });
        
        return; 

    


    } catch (error) {
    

        res.status(400).json({

            Estado: false,
            Respuesta: "Error al eliminar el cliente"

        });
        
        return; 

    }

})



app.use((req,res) =>{
    res.status(404).json({
        Estado: false,
        Respuesta: "Recurso no encontrado"
    })
});


app.listen(port, () => {
    console.log(`Servidor corriendo http://localhost:${port}`)
})
