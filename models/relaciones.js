
const Pedido_proveedor = require("./Pedido_proveedor");
const Proveedores = require("./Proveedores");
Proveedores.hasMany(Pedido_proveedor);
Pedido_proveedor.hasOne(Proveedores,{foreignKey:"DNI"});




