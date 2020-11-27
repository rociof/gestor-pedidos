const express = require("express");
const router = express.Router();

//modelo
const Articulo = require("../models/articulo");



//READ -- Leo todos los datos
router.get('index',  (req, res ) => 
  
  Articulo.findAll()
    .then(articulo => {
      
      res.render('index', {articulo})
    })
    .catch(err => console.log("Error" + err)));


// add Artículo

router.get("/nuevo", (req, res) =>  res.render("articulos/frmArticulo",{session: req.session}));

router.post('/nuevo', async function (req, res) {
    // Obtención de los datos del formulario
    let {IdArticulo, Familia, Descripcion, Stock, Activo, PrecioCompra, PrecioVenta, ImagenArticulo} = req.body;
  
    let articulo = new Articulo({IdArticulo, Familia, Descripcion, Stock, Activo, PrecioCompra, PrecioVenta, ImagenArticulo});
     
      try {
        console.log(articulo);
        await articulo.save();
        res.redirect("/");
      } catch(err) {
        res.render("articulos/frmArticulo", {error: err.message, session: req.session})        
      }
    
  })
  
  
  
  // READ -- Listado de todos
  router.get("/listado", (req, res) => {
    let articulo = Articulo.findAll().then((articulo) => {
      // console.log(articulos);
      res.render("articulos/listadoArticulos", { articulo, session: req.session });
    });
  });
  
  // leo los datos por Clave 
  router.get("/:id", (req, res) => {
    Articulo.findByPk(req.params.id)
      .then((articulo) => {      
        console.log(articulo);
        
        //  res.render('frmArticulo', {articulo, session:req.session})
  
        res.render('articulos/frmArticuloEdit', {articulo, session: req.session});
      })    
      .catch((err) => {
        res.json(err);
      });
  });
  





// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
  
    Articulo.update({
        IdArticulo: req.body.IdArticulo,
        Familia: req.body.Familia,
        Descripcion: req.body.Descripcion,
        Stock: req.body.Stock,
        Activo: req.body.Activo,
        PrecioVenta: req.body.PrecioVenta,
        PrecioCompra: req.body.PrecioCompra,
        ImagenArticulo: req.body.ImagenArticulo

    }, 
    {
        where: {
            IdArticulo: req.params.id,
        },
    })
        .then((resultado) => {
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
    Articulo.findByPk(req.params.id).then((articulo) => {
      // res.json(articulos);
      Articulo.destroy({
        where: {
          IdArticulo: req.params.id,
        },
      }).then((resultado) => {
        res.redirect("/articulo/listado");
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

