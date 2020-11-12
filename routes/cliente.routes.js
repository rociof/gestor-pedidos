const express = require("express");
const router = express.Router();

const Cliente = require("../models/cliente");
// const User = require('../models/User');

// READ -- Leo todos los datos
router.get("/", (req, res) => {
  Cliente.findAll().then((cliente) => {
    //res.json(cliente);
    res.render("cliente", {cliente});
  });
});
router.get("/nuevo", (req, res) => {
  Cliente.findAll().then((cliente) => {
    // res.json(cliente);
    res.render("frmRegistroCliente", {cliente});
    
  });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Cliente.findByPk(req.params.id).then((cliente) => {
    res.json(cliente);
  });
});

// Ingreso Datos
router.post("/nuevo", (req, res) => {
  Cliente.create({
      DNI: req.body.DNI,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Direccion: req.body.Direccion,
      Localidad: req.body.Localidad,
      CP: req.body.CP,
      Provincia: req.body.Provincia,
      Telefono: req.body.Telefono,
      Password: req.body.Password,
      Activo: req.body.Activo,
    })
    .then((cliente) => {
    res.json(cliente);
      
    })
    .catch((err) => {
      res.json(err);
    });
    res.redirect("/");
});

// UPDATE - Actualizo datos
router.put("/:id", (req, res) => {
  Cliente.update({
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Direccion: req.body.Direccion,
      Localidad: req.body.Localidad,
      CP: req.body.CP,
      Provincia: req.body.Provincia,
      Telefono: req.body.Telefono,
      Password: req.body.Password,
      Activo: req.body.Activo,
    }, {
      where: {
        DNI: req.params.id,
      },
    })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((err) => {
      res.json(err);
    });
});

// DELETE un cliente
router.delete("/:id", (req, res) => {
  Cliente.destroy({
    where: {
      DNI: req.params.id,
    },
  }).then((resultado) => {
    res.json(resultado);
  });
});

module.exports = router;