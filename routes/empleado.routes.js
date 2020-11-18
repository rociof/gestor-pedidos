const express = require("express");
const Empleado = require("../models/empleado");
const router = express.Router();

const Cliente = require("../models/empleado");
// const User = require('../models/User');

//READ -- Leo todos los datos
router.get('/', async function(req, res, next) {
 
  let empleado = await Empleado.findAll();

  res.render("empleado", {empleado, session:req.session});
});


router.get("/nuevo", (req, res) => {
  Empleado.findAll().then((empleadp) => {
    // res.json(empleado);
    res.render("frmRegistroEmpleado", {empleado});
    
  });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
    //res.json(empleado);
    res.render("datos_empleado", {empleado});
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
      Tipo: req.body.Tipo 
  
    })
  
    .then  ((empleado) => {
    // res.json(cliente);
     res.redirect("/");
    
    // res.render("datos_empleado", {empleado});

      
    })
    .catch((err) => {
      res.json(err);
      //console.log(err);
    });
  
});



// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
//Hace referencia al botón de borrado de la vista datos_empleado
  if (req.body.operacion=="Borrar") {
    Empleado.findByPk(req.params.id).then((empleado) => {
   //si el empleado existe
      if (empleado) { 
          empleado.destroy().then(() => {
            res.redirect("/");
          })   
      } else {
        res.redirect("/login")
      }       
        
    });
  
  } else {
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
      Tipo: req.body.Tipo 

    }, {
      where: {
        DNI: req.params.id,
      },
    })
    .then((resultado) => {
      //res.json(resultado);
      //res.redirect("/empleado/"+ req.params.id);
      res.redirect("/empleado");
    })
    .catch((err) => {
      res.json(err);
    });
  }
});



router.delete("/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
   
    if (empleado) { 
        Empleado.destroy().then(() => {
          res.redirect("/empleado");
        })   
    } else {
      res.redirect("/empleado")
    }



     
      
  });
});
module.exports = router;

