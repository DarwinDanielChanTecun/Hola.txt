
// FUNCIÓN PARA ACTUALIZAR A LOS USUARIOS DEL LOCAL STORAGE
const updateUserDatabase = users => {
    localStorage.setItem("users", JSON.stringify(users));
}

// FUNCIÓN PARA OBTENER LOS USUARIOS DEL LOCAL STORAGE
const getUserDatabase = () => {
    return JSON.parse(localStorage.getItem("users"));
}

// FUNCIÓN PARA OBTENER USUARIO CON SESIÓN INICIADA
const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// FUNCIÓN PARA CERRAR SESIÓN
const logout = () => {
    localStorage.removeItem("loggedInUser"); // ELIMINAMOS DEL LOCAL STORAGE EL USUARIO CON SESIÓN INICIADA
    window.location.href = "login.html"; // REDIRIGIMOS AL USUARIO A LA PÁGINA DE INICIO DE SESIÓN
}

// FUNCIÓN PARA COLOCAR EL NOMBRE DE USUARIO EN LA PÁGINA DE LA TABLA
const setupUserName = () => {
    const username = document.getElementById("username"); // OBTENEMOS EL ELEMENTO HTML CON "id" igual a "username"
    const loggedInUser = getLoggedInUser(); // OBTENEMOS DEL LOCAL STORAGE EL USUARIO CON SESIÓN INICIADA
    username.innerHTML = `${loggedInUser.firstname} ${loggedInUser.lastname}`; // COLOCAMOS AL ELEMENTO HTML "username" LOS NOMBRES DEL USAURIO DEL LOCAL STORAGE
}

// FUNCIÓN PARA CONFIGURAR LOS BOTONES
const setupButtons = () => {

    document.getElementById("logoutBtn").onclick = () => { logout(); } // CONFIGURAR EL BOTÓN DE CERRAR SESIÓN CON LA FUNCIÓN "logout"

    document.getElementById("editUserBtn").onclick = () => { // EL BOTÓN EDITAR DEBERÍA DE ENVIAR AL USUARIO A LA PÁGINA DE EDITAR
        window.location.href = "edit.html";
    }

    document.getElementById("deleteUserBtn").onclick = () => { // EL BOTÓN ELIMINAR DEBERÍA DE ENVIAR AL USUARIO A LA PÁGINA DE ELIMINAR
        window.location.href = "deleted.html";
    };

}

const setupTable = () => {

    const tableBody = document.getElementById("usersTableBody") // OBTENEMOS EL CUERPO DE LA TABLA
    const users = getUserDatabase(); // OBTENEMOS LOS USUARIOS DEL LOCAL STORAGE

    users.forEach(user => { // REPETIREMOS EL CÓDIGO DE ABAJO POR CADA USUARIO EN EL LOCAL STORAGE

        var html = `<tr>
            <td><input type="radio" id="user${user.userId}Radio" name="radio" onClick="selectUser(user.userId)"/></td>
            <td>${user.userId}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.role}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.loginAttempts}</td>
            <td>${user.isLocked ? "Sí" : "No"}</td>
            </tr>`; // ARMAMOS EL HTML QUE IRA DENTRO DEL CUERPO DE LA TABLA
             
        
        tableBody.innerHTML += html; // AGREGAMOS HTML AL CUERPO DE LA TABLA

    });


}

// SE EJECUTARÁ ESTE CÓDIGO CUANDO EL ARCHIVO HTML TERMINE DE CARGARSE
window.onload = function () {

    if (!getLoggedInUser()) { // SI EL USUARIO NO HA INICIADO SESIÓN LO REDIRECCIONA AL LOGIN
        window.location.href = "login.html";
    }

    setupUserName(); // CONFIGURAMOS EL NOMBRE DE USUARIO QUE INICIÓ SESIÓN
    setupTable(); // CONFIGURAMOS LOS USUARIOS DE LA TABLA, EL NOMBRE DE USUARIO Y LAS ACCIONES DE LOS BOTONES
    setupButtons(); // CONFIGURAMOS EL COMPORTAMIENTO DE LOS BOTONES

}

