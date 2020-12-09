const { Sequelize } = require("sequelize");

// conexion a Bases de Datos y establece conexion
const sequelize = require("./db");

const Empleado = require("../models/empleado");
const Cliente = require("../models/cliente");
const Articulo = require("../models/articulo");
const Proveedor = require("../models/proveedor");
const PedidoProv = require("../models/pedidoProv");
const DetPedProv = require('../models/detPedProv');
const PedidoCliente = require("../models/pedidoClie");
const DetPedCliente = require("../models/detPedClie");


// let empleados = [];

// require('./mdelos')
/**
 * Ejecutando en terminal "node.js" se crean registros para un entorno de prueba
 */
// Empleados
const empleados = [
  {
    DNI: "1",
    Nombre: "Nombre Emple1",
    Apellido: "Apellido Emple1",
    Direccion: "dir emple1",
    Localidad: "loc Emple1",
    Provincia: "prov emple1",
    CP: "15000",
    Telefono: "Tel emple1",
    Email: "emple1@gmail.com",
    Password: "123",
    Activo: true,
    Tipo: "Administrador",
  },
  {
    DNI: "2",
    Nombre: "Nombre Emple2",
    Apellido: "Apellido Emple2",
    Direccion: "dir emple2",
    Localidad: "loc Emple2",
    Provincia: "prov emple2",
    CP: "25000",
    Telefono: "Tel emple2",
    Email: "emple2@gmail.com",
    Password: "123",
    Activo: true,
    Tipo: "Gestor",
  },
  {
    DNI: "3",
    Nombre: "Nombre Emple3",
    Apellido: "Apellido Emple3",
    Direccion: "dir emple3",
    Localidad: "loc Emple3",
    Provincia: "prov emple3",
    CP: "35000",
    Telefono: "Tel emple3",
    Email: "emple3@gmail.com",
    Password: "123",
    Activo: false,
    Tipo: "Usuario_basico",
  },
  {
    DNI: "4",
    Nombre: "Nombre Emple4",
    Apellido: "Apellido Emple4",
    Direccion: "dir emple4",
    Localidad: "loc Emple4",
    Provincia: "prov emple4",
    CP: "45000",
    Telefono: "Tel emple4",
    Email: "emple4@gmail.com",
    Password: "123",
    Activo: true,
    Tipo: "Usuario_basico",
  }
];

// Clientes
const clientes = [
  {
    DNI: "1",
    Nombre: "Nombre Cliente 1",
    Apellido: "Apellido Cliente 1",
    Direccion: "dir Cliente 1",
    Localidad: "loc Cliente 1",
    Provincia: "prov Cliente 1",
    CP: "15000",
    Telefono: "Tel Cliente 1",
    Email: "Cliente1@gmail.com",
    Password: "123",
    Activo: true,
  },
  {
    DNI: "2",
    Nombre: "Nombre Cliente 2",
    Apellido: "Apellido Cliente 2",
    Direccion: "dir Cliente 2",
    Localidad: "loc Cliente 2",
    Provincia: "prov Cliente 2",
    CP: "25000",
    Telefono: "Tel Cliente 2",
    Email: "Cliente2@gmail.com",
    Password: "123",
    Activo: true,
  },
  {
    DNI: "3",
    Nombre: "Nombre Cliente 3",
    Apellido: "Apellido Cliente 3",
    Direccion: "dir Cliente 3",
    Localidad: "loc Cliente 3",
    Provincia: "prov Cliente 3",
    CP: "35000",
    Telefono: "Tel Cliente 3",
    Email: "Cliente3@gmail.com",
    Password: "123",
    Activo: true,
  },
  {
    DNI: "4",
    Nombre: "Nombre Cliente 4",
    Apellido: "Apellido Cliente 4",
    Direccion: "dir Cliente 4",
    Localidad: "loc Cliente 4",
    Provincia: "prov Cliente 4",
    CP: "45000",
    Telefono: "Tel Cliente 4",
    Email: "Cliente4@gmail.com",
    Password: "123",
    Activo: false,
  }
];

// Proveedor
const proveedores = [
  {
    DNI: "1",
    Nombre: "Nombre Proveedor 1",
    Apellido: "Apellido Proveedor 1",
    Direccion: "dir Proveedor 1",
    Localidad: "loc Proveedor 1",
    Provincia: "prov Proveedor 1",
    CP: "15000",
    Telefono: "Tel Proveedor 1",
    Email: "Proveedor1@gmail.com",
  },
  {
    DNI: "2",
    Nombre: "Nombre Proveedor 2",
    Apellido: "Apellido Proveedor 2",
    Direccion: "dir Proveedor 2",
    Localidad: "loc Proveedor 2",
    Provincia: "prov Proveedor 2",
    CP: "25000",
    Telefono: "Tel Proveedor 2",
    Email: "Proveedor2@gmail.com",
  },
  {
    DNI: "3",
    Nombre: "Nombre Proveedor 3",
    Apellido: "Apellido Proveedor 3",
    Direccion: "dir Proveedor 3",
    Localidad: "loc Proveedor 3",
    Provincia: "prov Proveedor 3",
    CP: "35000",
    Telefono: "Tel Proveedor 3",
    Email: "Proveedor3@gmail.com",
  },
  {
    DNI: "4",
    Nombre: "Nombre Proveedor 4",
    Apellido: "Apellido Proveedor 4",
    Direccion: "dir Proveedor 4",
    Localidad: "loc Proveedor 4",
    Provincia: "prov Proveedor 4",
    CP: "45000",
    Telefono: "Tel Proveedor 4",
    Email: "Proveedor4@gmail.com",
  }
];

// Articulos
const articulos = [
  {
    IdArticulo: "1",
    Familia: "A",
    Descripcion: "Articulo 1",
    Activo: true,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  },
  {
    IdArticulo: "2",
    Familia: "A",
    Descripcion: "Articulo 2",
    Activo: true,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  },
  {
    IdArticulo: "3",
    Familia: "B",
    Descripcion: "Articulo 3",
    Activo: true,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  },
  {
    IdArticulo: "4",
    Familia: "C",
    Descripcion: "Articulo 4",
    Activo: true,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  },
  {
    IdArticulo: "5",
    Familia: "C",
    Descripcion: "Articulo 5",
    Activo: true,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  },
  {
    IdArticulo: "6",
    Familia: "C",
    Descripcion: "Articulo 6",
    Activo: false,
    Stock: 10,
    PrecioVenta: 12,
    PrecioCompra: 20,
  }
];

sequelize
  // force= true limpio la BBDD
  .sync({ force: false })
  .then(() => {
    require("./mdelos");
    // Conexión establecida
    console.log("Conexión establecida...\n\n");
  })
  .then(() => {
    // Rellenar Empleados
    empleados.forEach((user) => Empleado.create(user));
  })
  .then(() => {
    // Rellenar Clientes
    clientes.forEach((clie) => Cliente.create(clie));
  })
  .then(() => {
    // Rellenar Proveedores
    proveedores.forEach((prov) => Proveedor.create(prov));
  })
  .then(() => {
    // Rellenar Articulos
    articulos.forEach((art) => Articulo.create(art));
  })
  .then(() => {
    Proveedor.hasMany(PedidoProv);
    PedidoProv.belongsTo(Proveedor);

    // cliente - Pedidos
    Cliente.hasMany(PedidoCliente);
    PedidoCliente.belongsTo(Cliente);

    /**Genera una clave primaria compuesta para DetPedClie
     *  con las claves primarias de PedidoClie y Articulo
     */
    // Articulo.belongsToMany(PedidoCliente, {
    //   through: DetPedCliente,
    //   foreignKey: "IdArticulo",
    // });

    // PedidoCliente.belongsToMany(Articulo, {
    //   through: DetPedCliente,
    //   foreignKey: "IdPedidoCli",
    // });

    // DetPedCliente.belongsTo(PedidoCliente, { foreignKey: "IdPedidoCli" });

    // Articulo.belongsToMany(PedidoProv, {
    //   through: DetPedProv,
    //   foreignKey: "IdArticulo",
    // });
    // PedidoProv.belongsToMany(Articulo, {
    //   through: DetPedProv,
    //   foreignKey: "IdPedidoProv",
    // });
    // DetPedProv.belongsTo(PedidoProv, { foreignKey: "IdPedidoProv" });
  });
