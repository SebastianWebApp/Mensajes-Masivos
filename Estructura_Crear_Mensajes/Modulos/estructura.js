import  connectToDB  from "../Database/conectar.js";

// Crear base de datos

const crearDatabase = async () => {

  try {

      // Creamos la tabla con nombre massmessage
      await connectToDB.query("CREATE DATABASE IF NOT EXISTS massmessage;");
      console.log("Base de datos massmessage creada (si no existía)");

      
  } catch (error) {
      console.error("Error al crear la base de datos:", error.message);
  }


}


const crearTabla = async () => {

  try {
      
      // Cambiar a la base de datos 'node_sql' después de crearla
      await connectToDB.query("USE massmessage;")

      // Crear Tabla 
      await connectToDB.query(`CREATE TABLE IF NOT EXISTS Mensajes (
           Id INT AUTO_INCREMENT PRIMARY KEY,
              Texto TEXT NOT NULL
          );`
      );
      console.log("Tabla 'Mensajes' creada (si no existía).");


  } catch (error) {
      console.error("Error al crear la tabla:", error.message);
  }

}


const procedimiento = async () => {
    try { 
      const Leer = `

      CREATE PROCEDURE Mensaje_Leer()
      BEGIN
        SELECT 
          *
        FROM 
          Mensajes;
      END;
      `;

const Crear = `
CREATE PROCEDURE Mensaje_Crear(IN inputTexto TEXT)
BEGIN
  INSERT INTO Mensajes (Texto)
  VALUES (inputTexto);
END;
`;

const Actualizar = `
CREATE PROCEDURE Mensaje_Actualizar(
  IN inputId INT,
  IN inputTexto TEXT
)
BEGIN
  UPDATE Mensajes
  SET 
    Texto = inputTexto
  WHERE 
    Id = inputId;
END;
`;
const Eliminar = `
CREATE PROCEDURE Mensaje_Eliminar(IN inputId INT)
BEGIN
  DELETE FROM Mensajes WHERE Id = inputId;
END;
`;
        // Primero eliminamos los procedimientos si ya existen
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mensaje_Leer");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mensaje_Crear");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mensaje_Actualizar");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Mensaje_Eliminar");

        // Crear los procedimientos
        await connectToDB.query(Leer);
        await connectToDB.query(Crear);
        await connectToDB.query(Actualizar);
        await connectToDB.query(Eliminar);

        console.log("Procedimientos almacenados creados correctamente.");
    } catch (error) {
        console.error("Error al crear el procedimiento almacenado:", error.message);
    }
};

export const InicializarDatabase = async () => {

    await crearDatabase();
    await crearTabla();
    await procedimiento();
    process.exit();  // Esto detendrá el proceso de Node.js y, por ende, el contenedor

}