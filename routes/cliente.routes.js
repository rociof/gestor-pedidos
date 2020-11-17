const express = require("express");
const router = express.Router();

const Cliente = require("../models/cliente");
// const User = require('../models/User');

//READ -- Leo todos los datos
router.get('/', async function(req, res, next) {
 
  let cliente = await Cliente.findAll();

  res.render("cliente", {cliente, session:req.session});
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
    //res.json(cliente);
    res.render("datos_cliente", {cliente});
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
      Activo: req.body.Activo 
  
    })
  
    .then  ((cliente) => {
    // res.json(cliente);
    res.redirect("/");
    // res.render("datos_cliente", {cliente});

      
    })
    .catch((err) => {
      res.json(err);
      //console.log(err);
    });
  
});



// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
//Hace referencia al botón de borrado de la vista datos_cliente
  if (req.body.operacion=="Borrar") {
    Cliente.findByPk(req.params.id).then((cliente) => {
   //si el cliente existe
      if (cliente) { 
          cliente.destroy().then(() => {
            res.redirect("/cliente");
          })   
      } else {
        res.redirect("/cliente")
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
      Activo: req.body.Activo
    }, {
      where: {
        DNI: req.params.id,
      },
    })
    .then((resultado) => {
      //res.json(resultado);
      //res.redirect("/cliente/"+ req.params.id);
      res.redirect("/cliente");
    })
    .catch((err) => {
      res.json(err);
    });
  }
});



router.delete("/:id", (req, res) => {
  Cliente.findByPk(req.params.id).then((cliente) => {
   
    if (cliente) { 
        Cliente.destroy().then(() => {
          res.redirect("/cliente");
        })   
    } else {
      res.redirect("/cliente")
    }



     
      
  });
});
module.exports = router;

