// Obtener los parámetros de la URL
let urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro "Usuario"
let Id_Usuario = urlParams.get('Usuario');

if(Id_Usuario == "" || Id_Usuario == null){
  alert("Inicie sesión para continuar");
  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;
}

else{
  leer();
}




var Id_Contenido;

async function leer() {
    try {
      // Realizar la solicitud al servidor
      const Solicitud = await fetch(`/api/crear_cuenta/Mensaje`, {
        method: "GET", // Cambiar a GET
        headers: {
          "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
        },
      });
  
      // Parsear la respuesta del servidor
      const Respuesta_Servidor = await Solicitud.json();
  
      if (Respuesta_Servidor.Estado) {
        // Obtener el contenedor donde se mostrarán los mensajes
        const listaMensajes = document.querySelector(".lista-mensajes");
  
        // Limpiar el contenedor antes de renderizar
        listaMensajes.innerHTML = "";
  
        // Recorrer los mensajes obtenidos y agregarlos al contenedor
        Respuesta_Servidor.Contenido.forEach((mensaje) => {
          const mensajeDiv = document.createElement("div");
          mensajeDiv.classList.add("mensaje");
          mensajeDiv.innerText = mensaje.Texto; // Asume que cada mensaje tiene un campo `Texto`
          // Al hacer clic en el mensaje, cargarlo en el textarea
          mensajeDiv.onclick = () => {
            const mensajeInput = document.getElementById("mensaje");
            mensajeInput.value = mensaje.Texto;  // Cargar el texto en el textarea para su edición    
            Id_Contenido = mensaje.Id;   
            
            document.getElementById("actualizar-mensaje").style.display = "inline-block";
            document.getElementById("eliminar-mensaje").style.display = "inline-block";
            document.getElementById("crear-mensaje").style.display = "none";

            
          };
  
          listaMensajes.appendChild(mensajeDiv);
        });
      } else {
        // Mostrar mensaje de error si la respuesta indica un problema
        alert(Respuesta_Servidor.Respuesta);
      }
    } catch (error) {
      // Manejar errores de red o de servidor
      console.error("Error al leer los mensajes:", error);
      alert("Ocurrió un error al intentar cargar los mensajes. Por favor, inténtalo de nuevo.");
    }
}  
  

document.getElementById("agregar-elemento").addEventListener("click", ()=> {
  var Herramienta = document.getElementById("elemento").value;
  var Mensaje = document.getElementById("mensaje").value;
  document.getElementById("mensaje").value = Mensaje + "{"+Herramienta+"}";
})


document.getElementById("crear-mensaje").addEventListener("click", async () => {
    const mensajeInput = document.getElementById("mensaje").value.trim();
  
    // Validar que el mensaje no esté vacío
    if (!mensajeInput) {
      alert("Por favor, escribe un mensaje antes de crearlo.");
      return;
    }
  
    try {
      // Realizar la solicitud al servidor
      const respuesta = await fetch(`/api/crear_cuenta/Mensaje`, {
        method: "POST",  // Usamos POST para enviar datos
        headers: {
          "Content-Type": "application/json", // Datos en formato JSON
        },
        body: JSON.stringify({
          Texto: mensajeInput, // Enviar el mensaje ingresado
        }),
      });
  
      // Parsear la respuesta del servidor
      const datos = await respuesta.json();
  
      // Verificar si la operación fue exitosa
      if (datos.Estado) {
        // Mostrar alerta con la respuesta del servidor
        alert(datos.Respuesta);
  
location.reload();
       } else {
        // Mostrar error del servidor si algo salió mal
        alert(datos.Respuesta);
      }
    } catch (error) {
      // Manejar errores de red o de servidor
      console.error("Error al enviar el mensaje:", error);
      alert("Ocurrió un error al intentar crear el mensaje. Por favor, inténtalo de nuevo.");
    }
});

document.getElementById("actualizar-mensaje").addEventListener("click", async () => {
    const mensajeInput = document.getElementById("mensaje").value.trim();
    // Validar que el mensaje no esté vacío
    if (!mensajeInput) {
        alert("Por favor, escribe un mensaje antes de crearlo.");
        return;
    }
    try {
        const solicitud = await fetch(`/api/crear_cuenta/Mensaje`, {
            method: "PUT", // Método HTTP PUT
            headers: {
                "Content-Type": "application/json", // Datos en formato JSON
            },
            body: JSON.stringify({ Id: Id_Contenido, Texto: mensajeInput }), // Enviar el cuerpo con el Id y el Texto
        });
        const respuestaServidor = await solicitud.json();
        if (respuestaServidor.Estado) {
            alert(respuestaServidor.Respuesta); // Mostrar mensaje de éxito
            location.reload();
        } else {
            alert(respuestaServidor.Respuesta); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error("Error al actualizar el mensaje:", error);
    }
});



document.getElementById("eliminar-mensaje").addEventListener("click", async () => {

    try {
        const solicitud = await fetch(`/api/crear_cuenta/Mensaje/${Id_Contenido}`, {
            method: "DELETE",
        });
        const respuestaServidor = await solicitud.json();
        if (respuestaServidor.Estado) {
            alert(respuestaServidor.Respuesta); // Mensaje de éxito
            location.reload();
        } else {
            alert(respuestaServidor.Respuesta); // Mensaje de error
        }
    } catch (error) {
        console.error("Error al eliminar el mensaje:", error);
    }
});







document.getElementById("Salir").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Clientes").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Envio").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes", "3004/Enviar");
  window.location.href = currentUrl;

});


document.getElementById("Vinculacion").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes","3006/QR");
  window.location.href = currentUrl;

});





document.getElementById("Salir1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Clientes1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Envio1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes", "3004/Enviar");
  window.location.href = currentUrl;

});


document.getElementById("Vinculacion1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3028/crear_mensajes","3006/QR");
  window.location.href = currentUrl;

});


// Filtro
const Filtro = document.getElementById("Filtro")
// Evento para filtrar los mensajes
Filtro.addEventListener("input", () => {
  const filtroValor = Filtro.value.toLowerCase();
  const mensajes = document.querySelectorAll(".mensaje");
  
  mensajes.forEach((mensajeDiv) => {
    const texto = mensajeDiv.innerText.toLowerCase();
    if (texto.includes(filtroValor)) {
      mensajeDiv.style.display = "block";
    } else {
      mensajeDiv.style.display = "none";
    }
  });
});

