const express = require("express");
const router = express.Router();
//const sequelize = require('../database/db');

// modelo
const Proveedor = require("../models/proveedor");

// get Empleado Lista
router.get('index',  (req, res ) => 
  
  Proveedor.findAll()
    .then(proveedor => {
      // console.log(clientes);
      // res.sendStatus(200);
      res.render('index', {proveedor})
    })
    .catch(err => console.log("Error" + err)));


// add Empleado

router.get("/nuevo", (req, res) =>  res.render("proveedores/frmProveedores"));

/************** */

router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia} = req.body;

    let proveedor = new Proveedor({DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia});
    try {
      await proveedor.save();
      res.redirect("/");
    } catch(err) {
      res.render("proveedores/frmProveedores", {error: err.message})        
    }
  
})



// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let proveedor = Proveedor.findAll().then((proveedor) => {
    // console.log(clientes);
    res.render("proveedores/listadoProveedores", { proveedor });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Proveedor.findByPk(req.params.id)
    .then((proveedor) => {      
      console.log(proveedor);
      res.render('proveedores/frmProveedoresEdit', {proveedor})
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => { 
  
    Proveedor.update(
      {
        
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Email: req.body.Email,
        Direccion: req.body.Direccion,
        Localidad: req.body.Localidad,
        CP: req.body.CP,
        Provincia: req.body.Provincia,
        Telefono: req.body.Telefono
        
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((resultado) => {        
        res.redirect("/proveedor/listado");
      })
      .catch((err) => {
        res.json({
          // status: 303,
          err,
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



router.get("/borrar/:id", (req, res) => {
  Proveedor.findByPk(req.params.id).then((proveedor) => {
    // res.json(clientes);
    Proveedor.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/proveedor/listado");
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
