const express = require("express");
const router = express.Router();

const Empleado = require("../models/empleado");
// const User = require('../models/User');

// READ -- Leo todos los datos

router.get('/', async function(req, res, next) {
  let empleado = await Empleado.findAll();
  res.render("empleado", {empleado, session:req.session});
});

router.get("/nuevo", (req, res) => {
  Empleado.findAll().then((empleado) => {
  res.render("frmRegistroEmpleado", {empleado});
    
  });
});
// router.get("/", (req, res) => {
//   Empleado.findAll().then((empleado) => {
//     //res.json(empleado);
//     res.render('empleado', { empleado });
    
//     // res.json("empleados!!!");
//   });
// });

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
    res.json(empleado);
   // res.render(empleado);
  });
});

// Ingreso Datos
router.post("/nuevo", (req, res) => {
  Empleado.create({
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
    Tipo: req.body.Tipo,
  })
    .then((empleado) => {
      res.redirect("/");
    
    })
    .catch((err) => {
      //console.error(err);
      res.json(err); 
          

    });
    //res.redirect("/");
});

// UPDATE - Actualizo datos
router.put("/:id", (req, res) => {
  Empleado.update(
    {
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
      Tipo: req.body.Tipo,
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


// DELETE un empleado
router.delete('/:id',(req,res)=>{
    Empleado.destroy({
        where: {
            DNI: req.params.id
        }
    }).then(resultado => {
        res.json(resultado);
    });
});

module.exports = router;
