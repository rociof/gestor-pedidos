// require('./mdelos');

/**
 * Relaciones entre tablas
 */

Proveedor.hasMany(PedidoProv);
PedidoProv.belongsTo(Proveedor);

// cliente - Pedidos
Cliente.hasMany(PedidoClie);
PedidoClie.belongsTo(Cliente);

/**Genera una clave primaria compuesta para DetPedClie
 *  con las claves primarias de PedidoClie y Articulo
 */

Articulo.belongsToMany(PedidoClie, {through: DetPedClie, foreignKey: "IdArticulo"});

PedidoClie.belongsToMany(Articulo, {through: DetPedClie, foreignKey: "IdPedidoCli"});

DetPedClie.belongsTo(PedidoClie, { foreignKey: "IdPedidoCli" });

Articulo.belongsToMany(PedidoProv, {through: DetPedProv, foreignKey:'IdArticulo'});

PedidoProv.belongsToMany(Articulo, {through: DetPedProv, foreignKey:'IdPedidoProv'});

DetPedProv.belongsTo(PedidoProv, { foreignKey:'IdPedidoProv'});
  
