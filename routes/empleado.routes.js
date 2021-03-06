const express = require("express");
const router = express.Router();

// var path = require('path');
const fs = require('fs');
/**
 * Multer es un middleware que sirve para subir imágenes al servidor
 * a través de un formulario
 */
const multer = require('multer');
/**
 * Ruta definitiva de las imágenes. Se guarda la imagen en local.
 * En la base de datos almacenamos la ruta
 */
const upload = multer({ dest:'public/img/imgEmpleados'});

//const sequelize = require('../database/db');

// modelo
const Empleado = require("../models/empleado");
const { necesitaAdmin } = require("../auth");

// get Empleado Lista
router.get("/", (req, res) => { 
  res.redirect('/');
});


/**
 * Para dar de alta a un empleado utilizaremos un middleware de autenticación
 * que unicamente permitirá al empleado con rol de administrador hacerlo.
 * Llamamos a la función "necesitaAdmin" (de auth.js)
 */
router.get("/nuevo", necesitaAdmin,  (req, res) =>
  res.render("empleados/frmEmpleado",{session: req.session})
);

router.post("/nuevo", upload.single("SFoto"), async function (req, res) {
  // Obtención de los datos del formulario
  let {
    DNI,
    Nombre,
    Apellido,
    Email,
    Direccion,
    Localidad,
    CP,
    Provincia,
    Password,
    Repassword,
    Telefono,
    Activo,
    Tipo,
    Foto,
  
  } = req.body;

  if (Password == Repassword) {
    let empleado = new Empleado({
      DNI,
      Nombre,
      Apellido,
      Email,
      Direccion,
      Localidad,
      CP,
      Provincia,
      Telefono,
      Activo,
      Tipo,
      Password,
      Foto,
    
    });
    try {
      await empleado.save();
      res.redirect("/");
    } catch (err) {
      res.render("empleados/frmEmpleado", {
        error: err.message, session: req.session
      });
    }
  } else {
    res.render("empleados/frmEmpleado", {
      error: "Password no coincide", session: req.session
    });
    //TODO: mostrar error
  }
});

/**
 * Para ver el listado de empleados  y crear un empleado nuevo
 * o subir imagen del mismo llamamos a la
 * función necesitaAdministración (sólo tiene permiso el administrador)
 */
router.get("/listado", necesitaAdmin, (req, res) => {
  Empleado.findAll({
    order: [ ['DNI','ASC'] ]
  }).then((empleado) => {
    // console.log(articulos);
    res.render("empleados/listadoEmpleado", {
      empleado, session: req.session
    });
  });
});

router.get("/listado/:name", (req, res) => {

  const id = req.params.name;
  // res.send("hola: " + id);
  console.log("Probando Item; ", id);  
    
    Empleado.findAll({
      order: [["DNI", "ASC"]],
      where: {
        Activo: id
      }
    }).then((empleado) => {
      // console.log(articulos);
      res.render("empleados/listadoEmpleado", {
        empleado,
        session: req.session,
      });
    });
  

});






router.get("/suboimagen",necesitaAdmin, (req, res) => {
  res.render("empleados/frmSubirImagen");
});
/**
 * "upload" es un objeto creado con el middleware Multer.
 * Si existe un archivo con el mismo nombre lo sobreescribe
 */
router.post("/suboImagen", upload.single("SFoto"), (req, res) => {
  fs.renameSync(req.file.path, req.file.destination + '/' +req.file.originalname );
  
  res.redirect('/');
});



// leo los datos por Clave
router.get("/:id", necesitaAdmin, (req, res) => {
  Empleado.findByPk(req.params.id)
    .then((empleado) => {
      // console.log(empleado);
      // console.log("ACTIVO: ",empleado.Activo);
      //  res.render('frmEmpleado', {empleado, session:req.session})

      res.render("empleados/frmEmpleado", {
        empleado, session: req.session
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE - Actualizo datos
router.post("/:id", upload.single("SFoto"), (req, res) => {

  if(req.file){
    console.log(req.file);
    fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname );
   }

  let Password = req.body.Password;
  let Repassword = req.body.Repassword;
  if (Password == Repassword) {
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
        Repassword: req.body.Password,
        Activo: req.body.Activo,
        Tipo: req.body.Tipo,
        Foto: req.body.Foto
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((empleado) => {
        res.redirect("/empleado/listado");
      })
      .catch((err) => {
        res.json({
          // status: 303,
          err,
        });
      });
    // }else{
    //   var error = 'La contraseñas no coinciden';
  }
});

// DELETE un cliente
router.get("/borrar/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
    // res.json(clientes);
    Empleado.destroy({
      where: {
        DNI: req.params.id,
      },
    })
      .then((resultado) => {
        res.redirect("/empleado/listado");
      })
      .catch((err) => {
        res.json({
          status: 303,
          err,
        });
      });
  });
});




module.exports = router;
