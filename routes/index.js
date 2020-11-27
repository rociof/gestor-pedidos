var express = require('express');
var router = express.Router();

/* Acceso a la Home: cualquiera puede acceder sin necesidad de loguearse. */
router.get('/', function(req, res, next) {
  // req.session.usuario = req.session.usuario ? req.session.usuario +1 :1;
  // res.send(`Rocio: ${req.session.usuario}`);
  //
  // res.render('index', { title: 'Hugo Tech Home'});
  res.render('index', { title: 'Hugo Tech Home', session:req.session });

});


module.exports = router;
