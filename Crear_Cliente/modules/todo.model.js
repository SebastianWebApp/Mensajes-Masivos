// Importamos el módulo mongoose, que se utiliza para interactuar con bases de datos MongoDB.
import mongoose from 'mongoose';

// Extraemos los objetos necesarios desde mongoose:
// - model: para definir nuevos modelos de datos.
// - models: para acceder a modelos previamente definidos.
// - Schema: para definir la estructura de los documentos en una colección.
const { model, models, Schema } = mongoose;

// Definimos un esquema para la colección "Prueba". Este esquema define la estructura de los documentos.
const todoSchema = new Schema({
    Nombre: { type: String, require: true },
    Telefono: { type: String, require: true },
    Fecha_nacimiento: { type: String, require: true },
    Ocupacion: { type: String, require: true }

}, {
    // Opciones del esquema:
    // - collection: Especifica el nombre de la colección en MongoDB donde se almacenarán los documentos.
    collection: "Cliente"
});

// Exportamos el modelo `Todo`:
// - Si ya existe un modelo llamado "Todo" en `models`, lo reutilizamos.
// - Si no existe, creamos un nuevo modelo con el esquema `todoSchema`.
export const Todo = models.Todo || new model("Todo", todoSchema);
