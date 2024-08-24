document.querySelector('btnIngresar').addEventListener('click',iniciarSesion);


function iniciarSesion(){
    
    var sCorreo = '';
    var sContraseña = '';
   

    sCorreo = document.querySelector('#txtCorreo').value;
    sContraseña = document.querySelector('#txtContraseña').value;

    bAcceso = validarCredenciales(sCorreo,sContraseña);
    if(bAcceso == true) 




    }   

