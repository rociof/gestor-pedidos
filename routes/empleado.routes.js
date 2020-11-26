const express = require("express");
const router = express.Router();
//const sequelize = require('../database/db');

// modelo
const Empleado = require("../models/empleado");
const { necesitaAutenticacion, necesitaAdmin } = require("../auth");

// get Empleado Lista
router.get('/',  (req, res ) => {  
      
      res.render('index')
})
   


// add Empleado

router.get("/nuevo", necesitaAdmin, (req, res) =>  res.render("empleados/frmEmpleado"));



router.post('/nuevo', necesitaAdmin, async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Password, Repassword, Activo, Tipo} = req.body;

  if (Password == Repassword) {
    let empleado = new Empleado({DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Activo,Tipo,Password});
    try {
      await empleado.save();
      res.redirect("/");
    } catch(err) {
      res.render("empleados/frmEmpleado", {error: err.message})        
    }
  } else {
    res.render("empleados/frmEmpleado", {error: "Password no coincide"})
    //TODO: mostrar error
  }
})



// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let empleado = Empleado.findAll().then((empleado) => {
    // console.log(articulos);
    res.render("empleados/listadoEmpleado", { empleado });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Empleado.findByPk(req.params.id)
    .then((empleado) => {      
      console.log(empleado);
      console.log("ACTIVO: ",empleado.Activo);
      //  res.render('frmEmpleado', {empleado, session:req.session})

      res.render('empleados/frmEmpleadoEdit', {empleado});
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => { 
  let Password = req.body.Password;
  let Repassword = req.body.Repassword;
  // if (password == repassword) {
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
        Tipo: req.body.Tipo
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((resultado) => {        
        res.redirect("/empleado/listado");
      })
      .catch((err) => {
        res.json({
          // status: 303,
          err
        });
      });
    // }else{
    //   var error = 'La contraseñas no coinciden';
    // }  
});

// router.post("/editar/:id", (req, res) => {
//   if (req.body.operacion == "Actualizar") {
//     Clientes.update(
//       {
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         email: req.body.email,
//         direccion: req.body.direccion,
//         localidad: req.body.localidad,
//         cp: req.body.cp,
//         provincia: req.body.provincia,
//         telefono: req.body.telefono,
//         password: req.body.password,
//         repassword: req.body.password,
//         activo: req.body.activo,
//       },
//       {
//         where: {
//           DNI: req.params.id,
//         },
//       }
//     )
//       .then((resultado) => {
//         // res.json(resultado);
//         res.redirect("/")
//       })
//       .catch((err) => {
//         res.json({
//           status: 303,
//           err,
//         });
//       });
//   } else {
//     Clientes.destroy({
//       where: {
//         DNI: req.params.id,
//       },
//     }).then((resultado) => {
//       res.json(resultado);
//     });
//   }
// });


// DELETE un cliente
router.get("/borrar/:id", (req, res) => {
  Empleado.findByPk(req.params.id).then((empleado) => {
    // res.json(clientes);
    Empleado.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/empleado/listado");
    })
    .catch((err) => {
      res.json({
        status: 303,
        err,
      });
    });  ;
  });
});

module.exports = router;
