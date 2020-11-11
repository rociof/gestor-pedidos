const express = require("express");
const router = express.Router();

const Proveedor = require("../models/proveedor");
// const User = require('../models/User');

// READ -- Leo todos los datos
router.get("/", (req, res) => {
  Proveedor.findAll().then((proveedor) => {
    res.json(proveedor);
    //res.render('clientes', { clientes });
    
  });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Proveedor.findByPk(req.params.id).then((proveedor) => {
    res.json(proveedor);
  });
});

// Ingreso Datos
router.post("/", (req, res) => {
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
      res.json(proveedor);
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE - Actualizo datos
router.put("/:id", (req, res) => {
  Proveedor.update(
    {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Direccion: req.body.Direccion,
      Localidad: req.body.Localidad,
      CP: req.body.CP,
      Provincia: req.body.Provincia,
      Telefono: req.body.Telefono,
      
    },
    {
      where: {
        DNI: req.params.id,
      },
    }
  ).then((resultado) => {
    res.json(resultado);
  })
  .catch((err) => {
    res.json(err);
  });
});


// DELETE un Proveedor
router.delete('/:id',(req,res)=>{
    Proveedor.destroy({
        where: {
            DNI: req.params.id
        }
    }).then(resultado => {
        res.json(resultado);
    });
});

module.exports = router;
