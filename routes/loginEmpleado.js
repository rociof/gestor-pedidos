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
        attributes: ['DNI', 'Password', 'Nombre', 'Email', 'Tipo'],
        where: {
            DNI,
            Password
        }
    });
    if (emple) {       
        req.session.emple = emple;
        //se fuerza el cierre de la sesión de usuario
        // req.session.usuario = undefined;
        res.redirect("/");
    } else {
        res.render("loginEmpleado", {
            error: "DNI o contraseña incorrectos"
        });
    }
})

router.get('/logout', function (req, res) {

    // elimino la cookie
    req.session = undefined;    
    res.redirect("/");
    
});



module.exports = router;