
// https://ull-esit-pl-1617.github.io/estudiar-cookies-y-sessions-en-expressjs-victor-pamela-jesus/cookies/chapter6.html
function necesitaAutenticacion(req, res, next) {
    if(req.session.empleado) next();
    else res.redirect("/");

}
//Se pueden crear funciones para que los usuarios accedan específicamente a lo que nos interese
//Lo normal es tener una función por rol
function necesitaAdmin(req, res, next) {
    if (req.session.empleado && req.session.empleado.tipo) next()
    else res.redirect("/empleado");
}
//Hay que exportar las funciones (y en el app.js)
module.exports = {necesitaAutenticacion, necesitaAdmin};