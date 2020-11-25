const express = require("express");
const router = express.Router();

const Cliente = require("../models/cliente");

//READ -- Leo todos los datos
// router.get('/', async function (req, res, next) {

//   let cliente = await Cliente.findAll();

//   res.render("/", {//listado clientes
//     cliente,
//     session: req.session
//   });
// });
router.get('/', (req, res) =>{

  Cliente.findAll();

  res.render("/", {//listado clientes
    cliente,
    session: req.session
  });
});

/**
 * 
 */
router.get("/nuevo", (req, res) => {
  Cliente.findAll().then((cliente) => {
    // res.json(cliente);
    // res.render("frmRegistroCliente", {
    res.render("frmClientes", {
      cliente,
      session: req.session
    });

  });
});
router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI, Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Password, Repassword, Activo} = req.body;

  if (Password == Repassword) {
    
    let cliente = new Cliente({DNI,Nombre, Apellido, Email, Direccion, Localidad, CP, Provincia, Password, Activo});
    try {
      await cliente.save();
      res.redirect("/");
    } catch(err) {
      res.render("frmClientes", {error: err.message})
    }
  } else {
    res.render("frmClientes", {error: "Password no coincide"})
    //TODO: mostrar error
  }
});

// leo los datos por Clave
// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
  //Hace referencia al botón de borrado de la vista datos_cliente


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

      res.redirect("listadoClientes");
    })
    .catch((err) => {
      res.json(err);
    });
  // }
});

router.get("/:id", (req, res) => {
  Cliente.findByPk(req.params.id).then((cliente) => {

    res.render("frmClientesEdit", {
      cliente,
      session: req.session
    });
  });
});

// Ingreso Datos



// DELETE un Usuario
router.get("/borrar/:id", (req, res) => {
  Cliente.findByPk(req.params.id).then((cliente) => {

    Cliente.destroy({
        where: {
          DNI: req.params.id,
        },
      }).then((resultado) => {
        res.redirect("/listadoClientes");
      })
      .catch((err) => {
        res.json({
          status: 303,
          err,
        });
      });;
  });
});





// router.delete("/:id", (req, res) => {
//   Cliente.findByPk(req.params.id).then((cliente) => {

//     if (cliente) {
//       Cliente.destroy().then(() => {
//         res.redirect("/cliente");
//       })
//     } else {
//       res.redirect("/")
//     }



//   });
// })

module.exports = router;