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
      await connectToDB.query(`CREATE TABLE IF NOT EXISTS Usuarios (
          Cedula VARCHAR(100) PRIMARY KEY,
          Nombre VARCHAR(100) NOT NULL,
          Telefono VARCHAR(100) NOT NULL,
          Clave VARCHAR(100) NOT NULL,
          IV VARCHAR(100) NOT NULL
          );`
      );
      console.log("Tabla 'Usuarios' creada (si no existía).");


  } catch (error) {
      console.error("Error al crear la tabla:", error.message);
  }

}


const procedimiento = async () => {
    try { 
        const Leer = `

CREATE PROCEDURE Iniciar_Sesion_Leer(IN inputCedula VARCHAR(100))
BEGIN
  SELECT 
    Cedula, 
    Nombre, 
    Telefono,
    Clave,
    IV
  FROM 
    Usuarios 
  WHERE 
    Cedula = inputCedula;
END;
`; 

        const Crear = `
CREATE PROCEDURE Iniciar_Sesion_Crear(IN inputCedula VARCHAR(100), IN inputNombre VARCHAR(100), IN inputTelefono VARCHAR(100), IN inputClave VARCHAR(100), IN inputIV VARCHAR(100))
BEGIN
  INSERT INTO Usuarios (Cedula, Nombre, Telefono, Clave, IV)
  VALUES (inputCedula, inputNombre, inputTelefono, inputClave, inputIV);
END;
`; 

        const Actualizar = `
CREATE PROCEDURE Iniciar_Sesion_Actualizar(
  IN inputCedula VARCHAR(100),
  IN inputNombre VARCHAR(100),
  IN inputTelefono VARCHAR(100),
  IN inputClave VARCHAR(100),
  IN inputIV VARCHAR(100)
)
BEGIN
  UPDATE Usuarios
  SET 
    Nombre = inputNombre,
    Telefono = inputTelefono,
    Clave = inputClave,
    IV = inputIV
  WHERE 
    Cedula = inputCedula;
END;
`;


        const Eliminar = `
 CREATE PROCEDURE Iniciar_Sesion_Eliminar(IN inputCedula VARCHAR(100))
 BEGIN
   DELETE FROM Usuarios WHERE Cedula = inputCedula;
 END;
 `;

        // Primero eliminamos el procedimiento si ya existe
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Leer");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Crear");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Actualizar");
        await connectToDB.query("DROP PROCEDURE IF EXISTS Iniciar_Sesion_Eliminar");

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