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
        req.session.usuario = undefined;
        res.redirect("/");

    } else {
        res.render("loginEmpleado", {
            error: "DNI o contraseña incorrectos"
        });
    }
})

router.get('/logoutEmple', function (req, res) {
    req.session = undefined;
    req.session.reset();
    res.redirect("/");
});


module.exports = router;