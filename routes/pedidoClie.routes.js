const express = require("express");
const router = express.Router();

// modelo
const PedidoCliente = require("../models/pedidoClie");
const Articulo = require("../models/articulo");
const Cliente = require("../models/cliente");
// const { necesitaGestor } = require("../auth");

// get PedidoClie Lista
router.get("/", (req, res) => {
  res.redirect('/');
});


router.get("/nuevo", function (req, res) {
    Cliente.findAll({
    order: [["Nombre", "ASC"]],
    where: {
      Activo: true
    }
  }).then((Clie) => {
    res.render("pedidosCliente/frmPedidoCliente", {Clie});
    // console.log(Clie);
  })
  .catch(err => {
  res.json(err)
  });
});

router.post("/nuevo",  (req, res) =>{
  // Obtención de los datos del formulario
  let {IdPedidoCli, Fecha, ClienteDNI, Direccion_entrega, TotalPedido } = req.body;

  let pedi = new PedidoCliente({
    IdPedidoCli, Fecha, ClienteDNI, Direccion_entrega, TotalPedido
  });
  console.log(pedi);
  
  res.redirect('/');
    // let pedidoClie = new PedidoClie({
    //   IdPedidoCli,
    //   Fecha,
    //   DNI,
    //   Direccion_entrega,
    //   TotalPedido
    // });
    // try {
    //   await pedidoClie.save();
    //   res.redirect("/");
    // } catch (err) {
    //   res.render("pedidosCliente/frmPedidoCliente", {
    //     error: err.message, session: req.session
    //   });
    // }

});


//listado de todos los Pedidos de cliente

router.get("/listado",(req, res) => {
  let pedidoClie = PedidoCliente.findAll({
    order: [["DNI", "ASC"]],
  }).then((pedidoClie) => {

    res.render("pedidosCliente/listadoPedidosCliente", {
      pedidoClie, session: req.session
    });
  });
});


// leo los datos por Clave
router.get("/:id", (req, res) => {
  PedidoCliente.findByPk(req.params.id)
    .then((pedidoClie) => {

      res.render("pedidosCliente/frmPedidosCliente", {
        empleado, session: req.session
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// // UPDATE - Actualizo datos
// router.post("/:id",  (req, res) => {

//     Empleado.update(
//       {
//         Nombre: req.body.Nombre,
//         Apellido: req.body.Apellido,
//         Email: req.body.Email,
//         Direccion: req.body.Direccion,
//         Localidad: req.body.Localidad,
//         CP: req.body.CP,
//         Provincia: req.body.Provincia,
//         Telefono: req.body.Telefono,
//         Password: req.body.Password,
//         Repassword: req.body.Password,
//         Activo: req.body.Activo,
//         Tipo: req.body.Tipo,
//         Foto: req.body.Foto
//       },
//       {
//         where: {
//           DNI: req.params.id,
//         },
//       }
//     )
//       .then((empleado) => {
//         res.redirect("/empleado/listado");
//       })
//       .catch((err) => {
//         res.json({
//           // status: 303,
//           err,
//         });
//       });
//     // }else{
//     //   var error = 'La contraseñas no coinciden';
//   }
// });

// // DELETE un cliente
// router.get("/borrar/:id", (req, res) => {
//   Empleado.findByPk(req.params.id).then((empleado) => {
//     // res.json(clientes);
//     Empleado.destroy({
//       where: {
//         DNI: req.params.id,
//       },
//     })
//       .then((resultado) => {
//         res.redirect("/empleado/listado");
//       })
//       .catch((err) => {
//         res.json({
//           status: 303,
//           err,
//         });
//       });
//   });
// });




module.exports = router;
