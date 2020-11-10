var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);


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


      //relaciones
      Proveedor.hasMany(PedidoProv);
      PedidoProv.belongsTo(Proveedor);
      Cliente.hasMany(PedidoClie);
      PedidoClie.belongsTo(Cliente);
      

      //creación de tablas si no existen
      connection.sync();
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
