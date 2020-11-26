
// https://ull-esit-pl-1617.github.io/estudiar-cookies-y-sessions-en-expressjs-victor-pamela-jesus/cookies/chapter6.html

/**
 * Esta función comprueba si el usuario
 * ha iniciado sesión previamente.
 * En ese caso permite continuar y si no redirige al index

 * 
 * @param {*} req Petición
 * @param {*} res Respuesta
 * @param {*} next Siguiente paso en Express
 */
 

function necesitaAutenticacion(req, res, next) {
    if(req.session.cliente) next();
    else res.redirect("/");

}
/**
  * Esta función comprueba si el usuario ha iniciado sesión y si tiene 
  * privilegios de administración
  * @param {*} req Petición 
  * @param {*} res Respuesta
  * @param {*} next Siguiente paso en Express
  */

//Se pueden crear funciones para que los usuarios accedan específicamente a lo que nos interese
//Lo normal es tener una función por rol
function necesitaAdmin(req, res, next) {
  console.log(req.session.empleado);
    if (req.session.empleado && req.session.empleado.Tipo == "Administrador") next()
    else res.redirect("/loginEmpleado");
}
function necesitaGestor(req, res, next) {
  console.log(req.session.empleado);
    if (req.session.empleado && req.session.empleado.Tipo == "Gestor") next()
    else res.redirect("/loginEmpleado");
}
//Hay que exportar las funciones (y en el app.js)
module.exports = {necesitaAutenticacion, necesitaAdmin, necesitaGestor};
