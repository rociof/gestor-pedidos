var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var hbs = require("hbs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");




var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/parciales', function (err) {});

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//RUTAS
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/cliente', require('./routes/cliente.routes'));
app.use('/proveedor', require('./routes/proveedor.routes'));
app.use('/empleado', require('./routes/empleado.routes'));

var usersRouter = require('./routes/usuarios');
app.use ("/login" , require('./routes/login'));
app.use("/usuarios", require('./routes/usuarios'));


const { Sequelize } = require("sequelize");
const Persona = require("./models/persona");
const Articulo = require("./models/articulo");
const Cliente = require("./models/cliente");
const Proveedor = require("./models/proveedor");
const Empleado = require("./models/empleado");
const PedidoClie = require("./models/PedidoClie");
const PedidoProv = require("./models/PedidoProv");
const DetPedClie = require("./models/detPedClie");
const DetPedProv = require("./models/detPedProv");
const Autor = require("./models/autor");





const connection = new Sequelize(
  "mariadb://root:maria123@localhost:3306/dbPedidos"
);

   connection
    .authenticate()
    .then(() => {
      Persona.init(connection);
      Articulo.init(connection);
      Cliente.init(connection);
      Proveedor.init(connection);
      Empleado.init(connection);
      PedidoClie.init(connection);
      PedidoProv.init(connection);
      DetPedClie.init(connection);
      DetPedProv.init(connection);
      Autor.init(connection);


      //RELACIONES

      Proveedor.hasMany(PedidoProv);
      PedidoProv.belongsTo(Proveedor);

      Cliente.hasMany(PedidoClie);
      PedidoClie.belongsTo(Cliente);

      /**Genera una clave primaria compuesta para DetPedClie
       *  con las claves primarias de PedidoClie y Articulo
       */
      Articulo.belongsToMany(PedidoClie, {through: DetPedClie, foreignKey:'Id_articulo'});
      PedidoClie.belongsToMany(Articulo, {through: DetPedClie, foreignKey:'Id_pedido_cli'});
      /**La clave foránea es un campo (no la PK)
       * de la tabla DetPedclie
       */
      DetPedClie.belongsTo(PedidoClie, { foreignKey:'Precio_venta'});


      Articulo.belongsToMany(PedidoProv, {through: DetPedProv, foreignKey:'Id_articulo'});
      PedidoProv.belongsToMany(Articulo, {through: DetPedProv, foreignKey:'Id_pedido_prov'});
      DetPedProv.belongsTo(PedidoProv, { foreignKey:'Precio_compra'});

     
      //creación de tablas si no existen
      connection.sync({force:false});
    })

  .catch((err) => {
    console.log(err);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  });
 module.exports = app;
