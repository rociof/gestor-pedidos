const express = require("express");
const Empleado = require("../models/empleado");
const router = express.Router();

// const Cliente = require("../models/empleado");
// const User = require('../models/User');

//READ -- Leo todos los datos
router.get('/', async function(req, res, next) {
 
  let empleado = await Empleado.findAll();

  res.render("lstEmpleado", {empleado, session:req.session});
});

router.get("/nuevo", (req, res) => {
  Empleado.findAll().then((empleado) => {
    // res.json(empleado);
    res.render("frmEmpleado", {empleado, session:req.session});

  });
});
// Ingreso Datos

router.post("/nuevo",async function (req, res) {
  // let {DNI, Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Password, Repassword, Tipo, Activo} = req.body;
 
  let empleado = new Empleado({DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Password, Tipo, Activo});
  try {
    await empleado.save();
    res.redirect("/");
  } catch(err) {
    res.render("frmEmpleado", {error: err.message})
  }
  
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
    //res.json(empleado);
    res.render("frmEmpleadoEdit", {empleado, session:req.session});
  });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
//Hace referencia al botón de borrado de la vista datos_empleado
  
    Empleado.update({
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
      Tipo: req.body.Tipo 

    }, {
      where: {
        DNI: req.params.id,
      },
    })
    .then((resultado) => {
      //res.json(resultado);
      //res.redirect("/empleado/"+ req.params.id);
      res.redirect("/lstEmpleado");
    })
    .catch((err) => {
      res.json(err);
    });
  
});




module.exports = router;

// DELETE un Usuario
router.get("/borrar/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {

    Empleado.destroy({
        where: {
          DNI: req.params.id,
        },
      }).then((resultado) => {
        res.redirect("/lstCliente");
      })
      .catch((err) => {
        res.json({
          status: 303,
          err,
        });
      });;
  });
});
module.exports = router;



