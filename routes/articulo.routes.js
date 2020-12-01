const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
/**
 * Multer es un middleware que sirve para subir imágenes al servidor
 * a través de un formulario
 */
const multer = require('multer');
/**
 * Ruta definitiva de las imágenes
 */
const upload = multer({ dest:'public/img/imgArticulos'});
//modelo
const Articulo = require("../models/articulo");
const { necesitaAutenticacion, necesitaAdmin } = require("../auth");

router.get("/", (req, res) => { 
  res.redirect('/');
});


// router.get("/subirImagen", (req, res) => {
//   res.render("articulos/frmSubirImagen");
// });

/**Para subir imágenes las procesamos con el middleware Multer
 * 
 * @param {*} req 
 * @param {*} res 
 */
function subirImagen(req, res) {
    
  const nuevaImagen = req.body.ImagenArticulo + ".jpg";

  /**Movemos y renombramos el archivo de la ubicación temporal 
   * a la carpeta /img/imgArticulos:
   * fsPromises.rename(oldPath, newPath)
   * 
   */
  fs.rename(req.file.path, './img/imgArticulos' + nuevaImagen, (err => {
    if(err) res.render("error", {err})
    else res.render("success")
}));
}
  //objeto upload
router.post("/upload", upload.single("portatil1"), subirImagen);

  //Añadir artículo
router.get("/nuevo", (req, res) =>
  res.render("articulos/frmArticulo", { session: req.session })
);

router.post("/nuevo", async function (req, res) {
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
    console.log(articulo);
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


router.get("/suboImagen", (req, res) => {
  res.render("articulos/frmSubirImagen");
});
/**
 * "upload" es un objeto creado con el middleware Multer
 */

router.post("/suboImagen", upload.single("imagen"), (req, res) => {
  
  // fs.renameSync(req.file.path, req.file.destination + '/' +req.file.originalname + '.' + req.file.mimetype.split('/')[1]);
  fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname );  
  console.log(req.file);
  res.redirect('/');
  
});


router.post("/suboImagen", upload.single("imagen"), (req, res) => {
  
  // fs.renameSync(req.file.path, req.file.destination + '/' +req.file.originalname + '.' + req.file.mimetype.split('/')[1]);
  fs.renameSync(req.file.path, req.file.destination + '/' + req.file.originalname );  
  console.log(req.file);
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
router.post("/:id", (req, res) => {
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
      //res.json(resultado);
     
      //res.redirect("/articulo/"+ req.params.id);
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
