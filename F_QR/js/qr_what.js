// Obtener los parámetros de la URL
let urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro "Usuario"
let Id_Usuario = urlParams.get('Usuario');

if(Id_Usuario == "" || Id_Usuario == null){
  alert("Inicie sesión para continuar");
  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;
}

else{
  leer();
}

async function leer() {
    try {
      // Realizar la solicitud al servidor
      const Solicitud = await fetch(`/api/QR_what/QR`, {
        method: "GET", // Cambiar a GET
        headers: {
          "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
        },
      });
  
      // Parsear la respuesta del servidor
      const Respuesta_Servidor = await Solicitud.json();
  
      if (Respuesta_Servidor.Estado) {
        document.getElementById("Mensaje_QR").innerHTML = Respuesta_Servidor.Respuesta;
        document.getElementById("QR").src = Respuesta_Servidor.Contenido;
        
      } else {
        // Mostrar mensaje de error si la respuesta indica un problema
        document.getElementById("Mensaje_QR").innerHTML = Respuesta_Servidor.Respuesta;
      }
    } catch (error) {
      // Manejar errores de red o de servidor
      console.error("Error al leer los mensajes:", error);
      alert("Ocurrió un error al intentar cargar los mensajes. Por favor, inténtalo de nuevo.");
    }
}  
  





document.getElementById("Salir").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Clientes").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Envio").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR", "3004/Enviar");
  window.location.href = currentUrl;

});

document.getElementById("Crear_Mensaje").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR","3028/crear_mensajes");
  window.location.href = currentUrl;

});


document.getElementById("Salir1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Clientes1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Envio1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR", "3004/Enviar");
  window.location.href = currentUrl;

});


document.getElementById("Crear_Mensaje1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3006/QR","3028/crear_mensajes");
  window.location.href = currentUrl;

});
