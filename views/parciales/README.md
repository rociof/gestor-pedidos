Programa para gestión de pedidos (clientes, artículos, empleados y proveedores).
-Los clientes se dan de alta a sí mismos. 
-Hay tres tipos de usuarios del sistema (usuario básico, administrador y gestor)
-Sólo el administrador podrá dar de alta a empleados. 
-El administrador tiene también los permisos de gestor.
-Los distintos niveles de autorización se definen en el archivo auth.js
-Permiten el acceso según la configuración del controlador: routes/empleado.routes.js
-Las relaciones entre las tablas están en el archivo database/asociaciones.js
-La conexión de la base de datos puede hacerse de dos modos:
        * A través de la configuración del archivo /database/db.js
        * Mediante la definición de una variable de entorno en el archivo .env (más seguro)
        En este caso se incluye un archivo ".env.ejemplo" con los datos reales de la conexión únicamente
        para propósitos de prueba (los datos reales nunca irían en el código).
        * En el archivo .env se define además la variable para  las cookie-secret
-Igualmente para el entorno de pruebas se crea un archivo /database/seed.js con registros ya generados.
Simplemente hay que abrir un terminal y ejecutar el comando "node seed.js"

