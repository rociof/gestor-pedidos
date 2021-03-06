const express = require("express");
const router = express.Router();
//const sequelize = require('../database/db');

// modelo
const Proveedor = require("../models/proveedor");

// get Empleado Lista
router.get("/", (req, res) => { 
  res.redirect('/');
});

// add Empleado

router.get("/nuevo", (req, res) =>
  res.render("proveedores/frmProveedores", { session: req.session })
);

/************** */

router.post("/nuevo", async function (req, res) {
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
    Telefono,
  } = req.body;

  let proveedor = new Proveedor({
    DNI,
    Nombre,
    Apellido,
    Email,
    Direccion,
    Localidad,
    CP,
    Provincia,
    Telefono,
  });
  try {
    await proveedor.save();
    res.redirect("/");
  } catch (err) {
    res.render("proveedores/frmProveedores", { error: err.message });
  }
});

// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let proveedor = Proveedor.findAll({
    order: [["DNI", "ASC"]],
  }).then((proveedor) => {
    res.render("proveedores/listadoProveedores", {
      proveedor,
      session: req.session,
    });
  });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Proveedor.findByPk(req.params.id)
    .then((proveedor) => {
      console.log(proveedor);
      res.render("proveedores/frmProveedores", {
        proveedor,
        session: req.session,
      });
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
      Telefono: req.body.Telefono,
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

router.get("/borrar/:id", (req, res) => {
  Proveedor.findByPk(req.params.id).then((proveedor) => {
    Proveedor.destroy({
      where: {
        DNI: req.params.id,
      },
    })
      .then((resultado) => {
        res.redirect("/proveedor/listado");
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
