// // Obtener los parámetros de la URL
let urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro "Usuario"
let Id_Usuario = urlParams.get('Usuario');

if(Id_Usuario == "" || Id_Usuario == null){
  alert("Inicie sesión para continuar");
  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;
}

else{
  leer_cliente();
  leer_mensajes();
}


var Lista_Clientes;
var Lista_Mensajes;
var datos = [];

async function leer_cliente() {
    try {
      // Realizar la solicitud al servidor
      const Solicitud = await fetch(`/api/crear_cliente/Cliente`, {
        method: "GET", // Cambiar a GET
        headers: {
          "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
        },
      });
  
      // Parsear la respuesta del servidor
      const Respuesta_Servidor = await Solicitud.json();
  
      if (Respuesta_Servidor.Estado) {

      
        // Obtener el contenedor existente 'clientes-lista'
        const divClientesLista = document.querySelector('.clientes-lista');
        // Limpiar el contenedor antes de renderizar
        divClientesLista.innerHTML = "";
     
        Lista_Clientes = Respuesta_Servidor.Contenido;
        // Recorrer los mensajes obtenidos y agregarlos al contenedor
        Respuesta_Servidor.Contenido.forEach((Cliente) => {
          const label = document.createElement('label');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = Cliente._id

          // Añadir un id o clase para facilitar la selección durante el filtro
          label.classList.add('cliente');  // Agregar una clase a cada label para facilitar el filtrado

          label.appendChild(checkbox);

          // Crear el contenido con los saltos de línea
          const clienteInfo = "Nombre: " + Cliente.Nombre + "<br><br>" + 
                              "Teléfono: " + Cliente.Telefono + "<br><br>" + 
                              "Fecha de Nacimiento: " + Cliente.Fecha_nacimiento + "<br><br>" + 
                              "Ocupación: " + Cliente.Ocupacion;

          // Agregar el contenido con los saltos de línea
          label.innerHTML += clienteInfo;  // Usar innerHTML para interpretar <br> como saltos de línea

          // Añadir el label al contenedor
          divClientesLista.appendChild(label);
        });


      } else {
        // Mostrar mensaje de error si la respuesta indica un problema
        alert(Respuesta_Servidor.Respuesta);
      }
    } catch (error) {
      // Manejar errores de red o de servidor
      alert("Ocurrió un error al intentar cargar los mensajes. Por favor, inténtalo de nuevo.");
    }
}  
  

async function leer_mensajes() {
  try {
    // Realizar la solicitud al servidor
    const Solicitud = await fetch(`/api/crear_cliente/Mensaje`, {
      method: "GET", // Cambiar a GET
      headers: {
        "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
      },
    });

    // Parsear la respuesta del servidor
    const Respuesta_Servidor = await Solicitud.json();

    if (Respuesta_Servidor.Estado) {
      const divMensajesLista = document.querySelector('.mensajes-lista');
      Lista_Mensajes = Respuesta_Servidor.Contenido;
      
      Respuesta_Servidor.Contenido.forEach(mensaje => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        const hElement = document.createElement('h3'); // Cambia 'h3' por el nivel de encabezado que necesites
    
        radio.type = 'radio';
        radio.value = mensaje.Texto;
        radio.name = 'grupo_mensajes';
        radio.id = mensaje.Id;
    
        hElement.innerText = mensaje.Texto; // Asignamos el texto con innerText al h
    
        label.classList.add('mensaje');
    
        label.appendChild(radio);  // Añadimos primero el radio
        label.appendChild(hElement); // Luego añadimos el encabezado con el texto
    
        divMensajesLista.appendChild(label);
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


document.getElementById("enviar-mensaje").addEventListener("click", () =>{
  datos = [];
  Obtener_Mensaje();
});

function Obtener_Mensaje() {
  const seleccionado = document.querySelector('.mensaje input[type="radio"]:checked'); // Busca el radio seleccionado
  if (seleccionado) {
      Obtener_Cliente(seleccionado.value);
  } else {
    alert("Seleccione un mensaje a enviar");
  }
}

function Obtener_Cliente(Mensaje) {
  const seleccionados = [];
  document.querySelectorAll('.cliente input[type="checkbox"]:checked').forEach((checkbox) => {
      seleccionados.push(checkbox.id); // Guarda el ID de cada cliente seleccionado
  });

  if(seleccionados.length == 0){
    alert("Seleccione un cliente a enviar el mensaje");
    return;
  }

  for (let index = 0; index < seleccionados.length; index++) {
    const clienteEncontrado = Buscar_Clientes(seleccionados[index]);

    if (clienteEncontrado) {

      var M_Telefono = "593" + clienteEncontrado.Telefono.slice(1);

      var Mensaje_Modificado = Mensaje.replace("{Nombre}",clienteEncontrado.Nombre).replace("{Teléfono}",clienteEncontrado.Telefono).replace("{Fecha de Nacimiento}",clienteEncontrado.Fecha_nacimiento).replace("{Ocupación}",clienteEncontrado.Ocupacion)

      datos.push({
         Nombre: clienteEncontrado.Nombre, Telefono: M_Telefono, Mensaje: Mensaje_Modificado, Estado: "Pendiente", ClaseEstado: "estado-pendiente"
      });

      
    }
  }

  document.getElementById("ContenedorNuevoMensaje").style.display = "none";
  document.getElementById("ContenedorMensajesCreados").style.display = "none";

  Crear_Tabla();


}

function Buscar_Clientes(id) {
  const cliente = Lista_Clientes.find(c => c._id === id);
  return cliente; // Devuelve el objeto con los datos del cliente
}

async function Crear_Tabla() {
  const contenedor = document.getElementById("ContenedorMaterias_Bloque_F2");

  if (!contenedor) {
      console.error("No se encontró el contenedor.");
      return;
  }

  const table = document.createElement("table");
  table.border = "1";
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.textAlign = "center";

  // Crear encabezado de la tabla
  const thead = document.createElement("thead");
  const encabezado = ["Nombre", "Teléfono", "Envío de mensaje", "Estado"];
  const trHead = document.createElement("tr");

  encabezado.forEach(texto => {
      const th = document.createElement("th");
      th.innerText = texto;
      trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  // Crear cuerpo de la tabla
  const tbody = document.createElement("tbody");

  datos.forEach((cliente,index) => {
      const tr = document.createElement("tr");
      tr.id = index;  // Usar nombre del cliente o índice como ID de la fila

      Object.keys(cliente).forEach(key => {
          if (key !== "ClaseEstado") {
              const td = document.createElement("td");

              // Si el texto contiene saltos de línea (\n), reemplazarlos por <br>
              if (typeof cliente[key] === 'string' && cliente[key].includes("\n")) {
                  td.innerHTML = cliente[key].replace(/\n/g, "<br>");  // Reemplazar \n por <br>
              } else {
                  td.textContent = cliente[key]; // Si no tiene saltos de línea, usar textContent
              }

              if (key === "Estado") {
                  td.classList.add(cliente.ClaseEstado);
                  td.id = index + "_class";
              }

              tr.appendChild(td);
          }
      });

      tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  contenedor.appendChild(table);



  for (let i = 0; i < datos.length; i++) {

    await enviar_mensaje(i+"_class", datos[i].Telefono, datos[i].Mensaje);
    
  }


}

async function enviar_mensaje(Id, Telefono, Mensaje) {
  try {
    // Realizar la solicitud al servidor
    const Solicitud = await fetch(`/api/crear_cliente/Enviar`, {
      method: "POST", // Cambiar a GET
      headers: {
        "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
      },
      body: JSON.stringify({
        Mensaje: Mensaje,
        Telefono: Telefono
      })
    });

    // Parsear la respuesta del servidor
    const Respuesta_Servidor = await Solicitud.json();

    if (Respuesta_Servidor.Estado) {
    
      document.getElementById(Id).className = "estado-enviado";
      document.getElementById(Id).innerHTML = "Enviado";

     
    } else {
      // Mostrar mensaje de error si la respuesta indica un problema
      document.getElementById(Id).className = "estado-error";
      document.getElementById(Id).innerHTML = "Error";

    }
  } catch (error) {
    // Manejar errores de red o de servidor
    alert("Ocurrió un error al intentar enviar los mensajes. Por favor, inténtalo de nuevo.");
  }
}  




document.getElementById("Salir").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Crear_Mensaje").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3028/crear_mensajes");
  window.location.href = currentUrl;

});

document.getElementById("Clientes").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Vinculacion").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3006/QR");
  window.location.href = currentUrl;

});



document.getElementById("Salir1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3003");
  // Eliminar "?Usuario=" y lo que venga después
  currentUrl = currentUrl.replace(/\?Usuario=.*/, "");
  window.location.href = currentUrl;

});

document.getElementById("Crear_Mensaje1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3028/crear_mensajes");
  window.location.href = currentUrl;

});

document.getElementById("Clientes1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar", "3010/Cliente");
  window.location.href = currentUrl;

});

document.getElementById("Vinculacion1").addEventListener("click", () =>{

  let currentUrl = window.location.href;
  currentUrl = currentUrl.replace("3004/Enviar","3006/QR");
  window.location.href = currentUrl;

});


const Filtro = document.getElementById("Filtro");

// Evento para filtrar los mensajes
Filtro.addEventListener("input", () => {
  const filtroValor = Filtro.value.toLowerCase();
  const mensajes = document.querySelectorAll(".cliente");  // Seleccionar todos los elementos con la clase 'mensaje'

  mensajes.forEach((mensajeDiv) => {
    const texto = mensajeDiv.innerText.toLowerCase();  // Usar innerText para obtener el texto
    if (texto.includes(filtroValor)) {
      mensajeDiv.style.display = "flex";  // Mostrar el mensaje si coincide con el filtro
    } else {
      mensajeDiv.style.display = "none";  // Ocultar el mensaje si no coincide con el filtro
    }
  });
});

const FiltroM = document.getElementById("FiltroM");

// Evento para filtrar los mensajes
FiltroM.addEventListener("input", () => {
  const filtroValor = FiltroM.value.toLowerCase();
  const mensajes = document.querySelectorAll(".mensaje");  // Seleccionar todos los elementos con la clase 'mensaje'

  mensajes.forEach((mensajeDiv) => {
    const texto = mensajeDiv.innerText.toLowerCase();  // Usar innerText para obtener el texto
    if (texto.includes(filtroValor)) {
      mensajeDiv.style.display = "flex";  // Mostrar el mensaje si coincide con el filtro
    } else {
      mensajeDiv.style.display = "none";  // Ocultar el mensaje si no coincide con el filtro
    }
  });
});

