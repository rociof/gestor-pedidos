var express = require('express');
// var Autor = require('../models/autor');
var Empleado = require('../models/empleado');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("loginEmpleado");
});

router.post('/', async function (req, res) {
    let {
        DNI,
        Password
    } = req.body;
    let emple = await Empleado.findOne({
        attributes: ['DNI', 'Password', 'Nombre', 'Email'],
        where: {
            DNI,
            Password
        }
    });
    if (emple) {
        req.session.emple = emple;
        //se fuerza el cierre de la sesión de usuario
        req.session.usuario = undefined;
        res.redirect("/empleado/" + DNI);


    } else {
        res.render("loginEmpleado", {
            error: "DNI o contraseña incorrectos"
        });
    }
})

router.get('/logoutEmple', function (req, res) {
    req.session = undefined;
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;