<?php
$host = "localhost"; // Dirección del servidor de base de datos (usualmente localhost)
$usuario = "root"; // Usuario de la base de datos
$contrasena = "";  // Contraseña del usuario (vacía si no se ha configurado)
$base_de_datos = "oveja_negra"; // Nombre de la base de datos a la que se conectará

// Crear una conexión a MySQL usando MySQLi
$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

$conexion->set_charset("utf8");

// Verificar si ocurrió un error en la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error); // Mostrar mensaje y detener ejecución si falla
}

/* // para hosting:
<?php
$host = "sql203.infinityfree.com"; // Dirección del servidor de base de datos (usualmente localhost)
$usuario = "if0_39011151"; // Usuario de la base de datos
$contrasena = "ot0VTtQEyRLESvK";  // Contraseña del usuario (vacía si no se ha configurado)
$base_de_datos = "if0_39011151_oveja_negra"; // Nombre de la base de datos a la que se conectará

// Crear una conexión a MySQL usando MySQLi
$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

$conexion->set_charset("utf8");

// Verificar si ocurrió un error en la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error); // Mostrar mensaje y detener ejecución si falla
} */