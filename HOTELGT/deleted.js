const updateUserDatabase = users => {
    localStorage.setItem("users", JSON.stringify(users));
}

const getUserDatabase = () => {
    return JSON.parse(localStorage.getItem("users"));
}

const deleteUser = (userId) => { // FUNCIÓN PARA ELIMINAR USUARIOS

    const users = getUserDatabase(); // OBTENER LOS USUARIOS DEL LOCAL STORAGE
    const userIndex = users.findIndex(u => u.userId === userId); // OBTENER EL ÍNDICE DEL USUARIO QUE ESTAMOS BUSCANDO

    if (userIndex < 0) { // SI NO ENCONTRAMOS UN USUARIO, LA FUNCIÓN "findIndex" RETORNA UN -1
        alert("No se puede eliminar el usuario");
    }

    users.splice(userIndex, 1); // FUNCIÓN PARA ELIMINAR ELEMENTOS DE UN ARRAY
    updateUserDatabase(users); // ACTUALIZAMOS LA INFORMACIÓN DEL LOCAL STORAGE

}
window.onload = function () {

    // TU BOTÓN ELIMINAR TIENE QUE TENER EL ID "deleteBtn" en tu archivo delete.html
    document.getElementById("deleteBtn").onclick = function () {
        const userId = document.getElementById("userIdTxt").value; // UNO DE LOS CAMPOS DE TEXTO TIENE QUE TENER EL ID "userIdTxt" Y SU VALOR DEBE DE SER EL ID DEL USUARIO QUE VAS A ELIMINAR
        deleteUser(userId);
    }

}