const updateUserDatabase = users => {
    localStorage.setItem("users", JSON.stringify(users));
}

// Función para obtener usuarios de la base de datos
const getUserDatabase = () => {
    return JSON.parse(localStorage.getItem("users"));
}

const setup = () => {

    const users = [ // CREAMOS UN ARRAY CON LOS USUARIOS QUE SE ALMACENARÁN EN EL LOCAL STORAGE
        { userId: 1, firstname: "Juan", lastname: "Alvarez", role: "administrador", password: "ju5555", email: "juanperez@hotelesgt.com", phoneNumber: "22334455", loginAttempts: 0, isLocked: false },
        { userId: 2, firstname: "Maria", lastname: "Batz", role: "administrador", password: "ma6666", email: "mariabatz@hotelesgt.com", phoneNumber: "33445566", loginAttempts: 0, isLocked: false },
        { userId: 3, firstname: "Daniela", lastname: "Cortez", role: "recepcionista", password: "da7777", email: "danielacortez@hotelesgt.com", phoneNumber: "44556677", loginAttempts: 0, isLocked: false },
        { userId: 4, firstname: "Antonio", lastname: "Dardon", role: "administrador", password: "anton88", email: "antoniodardon@hotelesgt.com", phoneNumber: "55667788", loginAttempts: 0, isLocked: false },
        { userId: 5, firstname: "Nicolas", lastname: "Estrada", role: "recepcionista", password: "nico55", email: "nicolasestrada@hotelesgt.com", phoneNumber: "66778899", loginAttempts: 0, isLocked: false },
        { userId: 6, firstname: "Martha", lastname: "Flores", role: "administrador", password: "flores33", email: "marthaflores@hotelesgt.com", phoneNumber: "77889900", loginAttempts: 0, isLocked: false },
    ];

    updateUserDatabase(users); // ALMACENAMOS LOS USUARIOS EN EL LOCAL STORAGE

}

const updateLoginAttempts = (user, loginAttempts) => { // FUNCIÓN PARA ACTUALIZAR LA CANTIDAD DE INTENTOS DE INICIO DE SESIÓN

    const users = getUserDatabase(); // OBTENER LOS USUARIOS DEL LOCAL STORAGE
    const userIndex = users.findIndex(u => u.userId === user.userId); // OBTENER EL ÍNDICE DEL USUARIO QUE ESTAMOS BUSCANDO

    if (userIndex < 0) { // SI NO ENCONTRAMOS UN USUARIO, LA FUNCIÓN "findIndex" RETORNA UN -1
        alert("No se puede modificar el usuario");
    }

    user.loginAttempts = loginAttempts; // ACTUALIZAMOS LA CANTIDAD DE INTENTOS DE INICIO DE SESIÓN
    user.isLocked = loginAttempts >= 3; // SI LOS INTENTOS DE INICIO DE SESIÓN SON MAYORES A 3, BLOQUEAMOS EL USUARIO
    users[userIndex] = user; // MODIFICAMOS EL USUARIO DEL LOCAL STORAGE PARA QUE SE BLOQUEE

    updateUserDatabase(users); // ACTUALIZAMOS LA INFORMACIÓN DEL LOCAL STORAGE

}

const login = (email, password) => { // FUNCIÓN PARA INICIAR SESIÓN

    const users = getUserDatabase(); // OBTENEMOS LOS USUARIOS DEL LOCAL STORAGE
    const user = users.find(u => u.email === email); // BUSCAMOS EL USUARIO POR SU EMAIL

    if (!user) { // DEVOLVEMOS UN ERROR CUANDO NO EXISTE EL USUARIO
        return { success: false, message: "El usuario no existe en la base de datos" };
    }

    if (user.isLocked) { // DEVOLVEMOS UN ERROR CUANDO EL USUARIO ESTÁ BLOQUEADO
        return { success: false, message: "El usuario se encuentra bloqueado" };
    }

    if (user.password !== password) { // SI EL USUARIO EXISTE, PERO LA CONTRASEÑA NO ES CORRECTA, INCREMENTAMOS LOS INTENTOS DE INICIO DE SESIÓN Y RETORNAMOS UN ERROR
        updateLoginAttempts(user, ++user.loginAttempts);
        return { success: false, message: "La contraseña es incorrecta" };
    }

    updateLoginAttempts(user, 0); // REINICIAMOS LOS INTENTOS DE INICIO DE SESIÓN PORQUE EL USUARIO ES CORRECTO
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // ALMACENAMOS EN EL LOCAL STORAGE EL USUARIO QUE INICIÓ SESIÓN

    return { success: true, message: "La sesión se ha iniciado" }; // RETORNAMOS UN MENSAJE DE EXITO

}


// FUNCIÓN PARA AGREGARLE COMPORTAMIENTO AL FORMULARIO DE INICIO DE SESIÓN
const setupLoginForm = () => {

    const loginForm = document.getElementById("loginForm"); // OBTENEMOS EL COMPONENTE HTML DEL FORMULARIO DE INICIO DE SESIÓN

    loginForm.onsubmit = event => { // CAMBIAMOS EL COMPORTAMIENTO DEL FORMULARIO CUANDO LO ESTAMOS ENVIANDO

        event.preventDefault(); // PREVENIMOS QUE EL FORMULARIO DE INICIO DE SESIÓN RECARGUE LA PÁGINA
        const email = document.getElementById("email").value; // OBTENEMOS EL VALOR DEL CAMPO DE TEXTO QUE TIENE COMO "id" LA PALABRA "email"
        const password = document.getElementById("password").value; // OBTENEMOS EL VALOR DEL CAMPO DE TEXTO QUE TIENE COMO "id" LA PALABRA "password"
        const loginResult = login(email, password); // EJECUTAMOS LA FUNCIÓN "login" CON LOS VALORES QUE OBTUVIMOS DE LOS CAMPOS DE TEXTO

        // LA FUNCIÓN "login" RETORNA UN OBJETO QUE TIENE UNA PROPIEDAD "success", CUANDO EL VALOR DE ESTA PROPIEDAD ES FALSO, MOSTRAMOS UNA ALERTA CON LA PROPIEDAD "message" DEL OBJETO
        if (!loginResult.success) {
            alert(loginResult.message); // MOSTRAMOS EL MENSAJE DE ERROR
            return;
        }

        // REDIRIJIMOS AL USUARIO A LA PÁGINA CON LA TABLA
        window.location.href = "table.html";

    }


}

// SE EJECUTARÁ ESTE CÓDIGO CUANDO EL ARCHIVO HTML TERMINE DE CARGARSE
window.onload = function () {

    setup(); // CONFIGURAMOS LOS USUARIOS DE LA BASE DE DATOS
    setupLoginForm(); // CONFIGURAMOS EL COMPORTAMIENTO DEL FORMULARIO DE INICIO DE SESIÓN

}

