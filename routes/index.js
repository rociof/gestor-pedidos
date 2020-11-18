var express = require('express');
var router = express.Router();

/* Acceso a la Home: cualquiera puede acceder sin necesidad de loguearse. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hugo Tech Home', session:req.session });
});


module.exports = router;
