const express = require("express");
const router = express.Router();

const Proveedor = require("../models/proveedor");
// const User = require('../models/User');

//READ -- Leo todos los datos
router.get('/', async function(req, res, next) {
  let proveedor = await Proveedor.findAll();
  res.render("proveedor", {proveedor, session:req.session});
});


router.get("/nuevo", (req, res) => {
  Proveedor.findAll().then((proveedor) => {
    res.render("frmRegistroProveedor", {proveedor});
    
  });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Proveedor.findByPk(req.params.id).then((proveedor) => {
    res.json(proveedor);
  });
});

// Ingreso Datos
router.post("/nuevo", (req, res) => {
  Proveedor.create({
      DNI: req.body.DNI,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Direccion: req.body.Direccion,
      Localidad: req.body.Localidad,
      CP: req.body.CP,
      Provincia: req.body.Provincia,
      Telefono: req.body.Telefono,
      
    })
    .then((proveedor) => {
      
    res.redirect("/");
      
    })
    .catch((err) => {
      res.json(err);
    });
  
});

// UPDATE - Actualizo datos
router.put("/:id", (req, res) => {
  Proveedor.update({
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Direccion: req.body.Direccion,
      Localidad: req.body.Localidad,
      CP: req.body.CP,
      Provincia: req.body.Provincia,
      Telefono: req.body.Telefono,
      
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
  Proveedor.destroy({
    where: {
      DNI: req.params.id,
    },
  }).then((resultado) => {
    res.json(resultado);
  });
});

module.exports = router;

