const express = require("express");
const router = express.Router();
// const path = require('path');
const fs = require('fs');
/**
 * Multer es un middleware que sirve para subir imágenes al servidor
 * a través de un formulario
 */
const multer = require('multer');
/**
 * Ruta definitiva de las imágenes
 */
const upload = multer({ dest: 'public/img/imgArticulos' });
//modelo
const Articulo = require("../models/articulo");
const { necesitaAdmin } = require("../auth");

router.get("/", (req, res) => {
  res.redirect('/');
});

//Añadir artículo
router.get("/nuevo", (req, res) =>
  res.render("articulos/frmArticulo", { session: req.session })
);

router.post("/nuevo", upload.single("SIma"),async function (req, res) {

  if(req.file){
    console.log(req.file);
    fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname );
   }
  // Obtención de los datos del formulario
  let {
    IdArticulo,
    Familia,
    Descripcion,
    Stock,
    Activo,
    PrecioCompra,
    PrecioVenta,
    ImagenArticulo,
  } = req.body;

  let articulo = new Articulo({
    IdArticulo,
    Familia,
    Descripcion,
    Stock,
    Activo,
    PrecioCompra,
    PrecioVenta,
    ImagenArticulo,
  });

  try {
    await articulo.save();
    res.redirect("/");
  } catch (err) {
    res.render("articulos/frmArticulo", {
      error: err.message,
      session: req.session,
    });
  }
});

// READ -- Listado de todos
router.get("/listado", (req, res) => {

  Articulo.findAll({
    order: [["IdArticulo", "ASC"]],
  }).then((articulo) => {
    // console.log(articulos);
    res.render("articulos/listadoArticulos", {
      articulo,
      session: req.session,
    });
  });
});

router.get("/listado/:name", (req, res) => {

  const id = req.params.name;
  // res.send("hola: " + id);
  console.log("Probando Item; ", id);  
    
    Articulo.findAll({
      order: [["IdArticulo", "ASC"]],
   
      where: {
        Activo: id
      }
    }).then((articulo) => {
      // console.log(articulos);
      res.render("articulos/listadoArticulos", {
        articulo,
        session: req.session,
      });
    });
  

});


/**Para subir imágenes las procesamos con el middleware Multer
 */
/**Movemos y renombramos el archivo de la ubicación temporal 
   * a la carpeta /img/imgArticulos:
   * fs.rename(oldPath, newPath)
   * 
   */
router.get("/suboImagen", (req, res) => {
  res.render("articulos/frmSubirImagen");
});
/**
 * "upload" es un objeto creado con el middleware Multer.
 * Si existe un archivo con el mismo nombre lo sobreescribe
 */

router.post("/suboImagen", upload.single("SIma"), (req, res) => {
  
  fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname);

  res.redirect('/');

});

// leo los datos por Clave
router.get("/:id", (req, res) => {
  Articulo.findByPk(req.params.id)
    .then((articulo) => {
      res.render("articulos/frmArticulo", { articulo, session: req.session });
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE - Actualizo datos
router.post("/:id", upload.single("SIma"), (req, res) => {

   if(req.file){
    console.log(req.file);
    fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname );
   }

  Articulo.update(
    {
      IdArticulo: req.body.IdArticulo,
      Familia: req.body.Familia,
      Descripcion: req.body.Descripcion,
      Stock: req.body.Stock,
      Activo: req.body.Activo,
      PrecioVenta: req.body.PrecioVenta,
      PrecioCompra: req.body.PrecioCompra,
      ImagenArticulo: req.body.ImagenArticulo,
    },
    {
      where: {
        IdArticulo: req.params.id,
      },
    }
  )
    .then((articulo) => {      
      res.redirect("/articulo/listado");
    })
    .catch((err) => {
      res.json(err);
    });

});

// DELETE un articulo
router.get("/borrar/:id", (req, res) => {
  Articulo.findByPk(req.params.id).then(() => {
    // res.json(articulos);
    Articulo.destroy({
      where: {
        IdArticulo: req.params.id,
      },
    })
      .then((resultado) => {
        res.redirect("/articulo/listado");
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

module.exports = router;
