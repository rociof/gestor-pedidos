function necesitaAutenticacion(req, res, next) {
    if(req.session.usuario) next();
    else res.redirect("/login");

}
//Se pueden crear funciones para que los usuarios accedan específicamente a lo que nos interese
//Lo normal es tener una función por rol
function necesitaAdmin(req, res, next) {
    if (req.session.usuario && req.session.usuario.isAdmin) next()
    else res.redirect("login");
}
//Hay que exportar las funciones (y en el app.js)
module.exports = {necesitaAutenticacion, necesitaAdmin};