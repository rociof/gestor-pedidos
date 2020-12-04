
/**Middleware de autenticación y autorización: express-session 
 * Exportamos las funciones y las llamaremos a las funciones creadas desde app.js
*/
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
    if(req.session.usuario || req.session.emple ) next();
    else res.redirect("/");

}
/**
  * Función que comprueba si el usuario ha iniciado sesión y si tiene 
  * privilegios de administración. En caso contrario redirige al loginEmpleado
  * @param {*} req Petición 
  * @param {*} res Respuesta
  * @param {*} next Siguiente paso en Express
  */



function necesitaAdmin(req, res, next) {
    if (req.session.emple && req.session.emple.Tipo == "Administrador") next()
    else res.redirect("/");
}

/**Función que comprueba si el usuario ha iniciado sesión y es Gestor
 * 
 * @param {*} req Petición
 * @param {*} res Respuesta
 * @param {*} next Siguiente paso
 */
function necesitaGestor(req, res, next) {
  console.log(req.session.emple);
    if ((req.session.emple && req.session.emple.Tipo == "Gestor") || (req.session.emple && req.session.emple.Tipo == "Administrador"))  next()
    else res.redirect("/loginEmpleado");
}

module.exports = {necesitaAutenticacion, necesitaAdmin, necesitaGestor};
