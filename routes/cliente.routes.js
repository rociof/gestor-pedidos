const express = require("express");
const router = express.Router();
//const sequelize = require('../database/db');

// modelo
const Cliente = require("../models/cliente");
const {necesitaAutenticacion } = require("../auth");

// get CLiente Lista
router.get("/", (req, res) => { 
  res.redirect('/');
});


// add CLiente
/**
 * Un cliente se puede registrar
 */

router.get("/nuevo", (req, res) =>  res.render("clientes/frmClientes",{session: req.session}));


/************** */

router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Telefono, Password, Repassword, Activo} = req.body;

  if (Password == Repassword) {
    let cliente = new Cliente({DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Telefono, Activo,Password});
    try {
      await cliente.save();
      // res.redirect("/");
      
      res.render("index", {cliente, session:req.session});

    } catch(err) {
      res.render("clientes/frmClientes", {error: err.message,session: req.session})        
    }
  } else {
    res.render("clientes/frmClientes", {error: "Password no coincide", session: req.session});
    //TODO: mostrar error
  }
})



// READ -- Listado de todos
router.get("/listado", (req, res) => {
  Cliente.findAll({
    order: [ ['DNI','ASC'] ]
  }).then((cliente) => {
    // console.log(clientes);
    res.render("clientes/listadoClientes", { cliente, session: req.session });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Cliente.findByPk(req.params.id)
    .then((cliente) => {      
      // console.log(clientes);

      // console.log("ACTIVO: ",cliente.Activo);
      //  res.render('frmClientes', {clientes})

      // res.render('clientes/frmClientesEdit', {cliente, session:req.session})
      res.render('clientes/frmClientes', {cliente, session:req.session})
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
/**
 * Para actualizar los datos el cliente necesita estar logueado
 */
router.post("/:id",necesitaAutenticacion, (req, res) => { 
  let password = req.body.Password;
  let repassword = req.body.Repassword;
  if (password == repassword) {
    Cliente.update(
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
        Repassword: req.body.Password,
        Activo: req.body.Activo
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((cliente) => {        
        res.redirect("/cliente/listado");
        res.render("index", {cliente, session:req.session});
      })
      .catch((err) => {
        res.json(err);
      });
    }else{
      var error = 'La contraseñas no coinciden';
    }  
});

// DELETE un cliente
router.get("/borrar/:id", (req, res) => {
  Cliente.findByPk(req.params.id).then((cliente) => {
    // res.json(clientes);
    Cliente.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/cliente/listado");
    })
    .catch((err) => {
      res.json(err);
    });
  });
});

module.exports = router;
