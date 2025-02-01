

document.getElementById("Btn_Iniciar_Sesion").addEventListener('click',async () => {

    const Cedula = document.getElementById("Inp_Cedula").value;
    const Clave = document.getElementById("Inp_Clave").value;

    if(Cedula == ""){
        alert("Ingrese su número de cédula");
        return;
    }

    if(Cedula.length != 10){
        alert("Su cédula debe poseer 10 dígitos");
        return;
    }
   
    if(Clave == ""){
        alert("Ingrese una contraseña");
        return;
    }

    if(Clave.length < 6){
        alert("Su clave debe poseer al menos 6 dígitos");
        return;
    }

    alert("Espere un momento....");

    // Hacemos una solicitud al servidor cuando se haga clic

    const Solicitud = await fetch(`api/crear_cuenta/Verificar_Credenciales`, {
        method: "POST",  // Cambiar a POST
        headers: {
            "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({
            Cedula: Cedula,
            Clave: Clave
        })
    });
    
    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){

        let currentUrl = window.location.href;
        currentUrl = currentUrl.replace("3003/","3010/Cliente?Usuario="+Cedula);
        window.location.href = currentUrl;
        


    }
    else{
        alert(Respuesta_Servidor.Respuesta);
    }

   
});


document.getElementById("Btn_Crear_Cuenta").addEventListener("click", async() =>{

    try {
        
        window.location.href = "/crear_cuenta";

    } catch (error) {
        alert("Intente de nuevo");
    }


});