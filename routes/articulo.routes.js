const express = require("express");
const Articulo = require("../models/articulo");

const router = express.Router();

//READ -- Leo todos los datos
router.get('/', async function (req, res, next) {

    let articulo = await Articulo.findAll();

    res.render("articulo", {articulo, session:req.session});
});


router.get("/nuevo", (req, res) => {
    Articulo.findAll().then((articulo) => {
        // res.json(articulo);
        res.render("frmAltaArticulo", {articulo, session:req.session});

    });
});

// leo los datos por Clave
router.get("/:id", (req, res) => {
    Articulo.findByPk(req.params.id).then((articulo) => {
        //res.json(articulo);
        res.render("datos_articulo", {articulo, session:req.session});
    });
});

// Ingreso Datos

router.post("/nuevo", (req, res) => {

    Articulo.create({
        IdArticulo: req.body.IdArticulo,
        Familia: req.body.Familia,
        Descripcion: req.body.Descripcion,
        Stock: req.body.Stock,
        Activo: req.body.Activo,
        PrecioVenta: req.body.PrecioVenta,
        PrecioCompra: req.body.PrecioCompra,
        ImagenArticulo: req.body.ImagenArticulo

    })

        .then((articulo) => {
            // res.json(cliente);
            res.redirect("/");

            // res.render("datos_empleado", {empleado});


        })
        .catch((err) => {
            res.json(err);
            //console.log(err);
        });

});



// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {
    //Hace referencia al botón de la vista datos_Articulo con el name "Borrar"
    if (req.body.operacion == "Borrar") {
        Articulo.findByPk(req.params.id).then((articulo) => {
            //si el articulo existe
            if (articulo) {
                articulo.destroy().then(() => {
                    // console.log("artículo eliminado");
                    res.redirect("/articulo");
                })
            } else {
                res.json(err); {
            
        }
    }

});

    } else {
    Articulo.update({
        IdArticulo: req.body.IdArticulo,
        Familia: req.body.Familia,
        Descripcion: req.body.Descripcion,
        Stock: req.body.Stock,
        Activo: req.body.Activo,
        PrecioVenta: req.body.PrecioVenta,
        PrecioCompra: req.body.PrecioCompra,
        ImagenArticulo: req.body.ImagenArticulo

    }, {
        where: {
            IdArticulo: req.params.id,
        },
    })
        .then((resultado) => {
            //res.json(resultado);
            //res.redirect("/empleado/"+ req.params.id);
            res.redirect("/articulo");
        })
        .catch((err) => {
            res.json(err);
        });
}
});



router.delete("/:id", (req, res) => {
    Articulo.findByPk(req.params.id).then((articulo) => {

        if (articulo) {
            Articulo.destroy().then(() => {
                res.redirect("/articulo");
            })
        } else {
            res.redirect("/articulo")
        }


    });
});
module.exports = router;

