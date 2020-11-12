var express = require('express');
var Autor = require('../models/autor');


var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("login");
});

router.post('/', async function (req, res) {
    let {email, password} = req.body;
    let usuario = await Autor.findOne({
        attributes: ['id', 'email', 'nombre'],
        where: {
            email,
            password
        }
    });
    if (usuario) {
        req.session.usuario = usuario;
        res.redirect("/");
    } else {
        res.render("login", {error: "Email o contraseña incorrectos"});
    }
})



module.exports = router;
