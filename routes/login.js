var express = require('express');

var Cliente = require('../models/cliente');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("login");
});

router.post('/', async function (req, res) {
    let {
        DNI,
        Password
    } = req.body;
    let usuario = await Cliente.findOne({
        attributes: ['DNI', 'Password', 'Nombre', 'Email'],
        where: {
            DNI,
            Password
        }
    });
    if (usuario) {
        req.session.usuario = usuario;
        //res.redirect("/cliente");
        //Nos muestra el listado de cliente filtrado por el DNI
        res.redirect("/cliente/"+ DNI);

        


    } else {
        res.render("login", {
            error: "DNI o contraseña incorrectos"
        });
    }
})

router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect("/");
});


module.exports = router;