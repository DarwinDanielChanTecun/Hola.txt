function obtenerListaUsuarios(){
    var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLs'));
     if (listaUsuarios == null){
        listaUsuarios =
        [ //numero nombre apellido  rol          contraseña        correo             telefono
            ['1','Juan','alvarez','administrador','5555','juanperez@hotelesgt.com', '22334455']
            ['2','Daniela','cortez','recepcionista','6666','danielacortez@hotelesgt.com', '44556677']
        ]
     }
     return listaUsuarios;
}
function validarCredenciales(pCorreo , pContraseña){
    var listaUsuarios = obtenerListaUsuarios();
    var bAcceso = false

    for(var i = 0; i < listaUsuarios.length; i++){
        if(pCorreo == listaUsuarios[i][5] && pContraseña == listaUsuarios[i][4] ) {
            bAcceso = true;
       sessionStorage.getItem('usuarioActivo', listaUsuarios[i][1]+ ' ' + listaUsuarios[i][2]);
       sessionStorage.getItem('rolUsuarioActivo',listaUsuarios[i][3])
        }

}
return bAcceso;







}




























