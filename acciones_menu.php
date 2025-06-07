<?php
include("config_BDD.php");

// AGREGAR UN NUEVO ÍTEM
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["submit"])) { //nos aseguramos que la solicitud sea POST y submit
    $nombre = trim($_POST["nombre"]); //obtenemos los datos enviados del form
    $precio = $_POST["precio"];
    $categoria = trim($_POST["categoria"]);
    $descripcion = trim($_POST["descripcion"]);
    $ruta_imagen = trim($_POST["ruta_imagen"]);

    if (empty($nombre) || empty($precio) || empty($categoria)) { // validamos que los campos relevantes no esten vacios
        exit("<script>alert('Por favor complete todos los campos requeridos.'); history.back();</script>");
    }

    //preparamos la consulta a SQL
    $stmt = $conexion->prepare("INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $nombre, $precio, $categoria, $descripcion, $ruta_imagen);

    if ($stmt->execute()) { //condicional que ejecuta y se fija que funcione y responde acorde
        echo "Ítem agregado correctamente";
    } else {
        echo "error: " . $conexion->error;
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// ACTUALIZAR UN ÍTEM EXISTENTE
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["modificar"])) {//nos aseguramos que la solicitud sea POST y modificar
    $id = intval($_POST["id"]); //obtenemos los datos enviados del form
    $nombre = trim($_POST["nombre"]);
    $precio = $_POST["precio"];
    $categoria = trim($_POST["categoria"]);
    $descripcion = trim($_POST["descripcion"]);
    $ruta_imagen = trim($_POST["ruta_imagen"]);

    if (empty($id) || empty($nombre) || empty($precio) || empty($categoria)) {// validamos que los campos relevantes no esten vacios
        exit("<script>alert('Todos los campos son obligatorios.'); window.location.href = 'miperfil.html';</script>");
    }

    //preparamos la consulta a SQL
    $stmt = $conexion->prepare("UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?");
    $stmt->bind_param("sdsssi", $nombre, $precio, $categoria, $descripcion, $ruta_imagen, $id);

    if ($stmt->execute()) { //condicional que ejecuta y se fija que funcione y responde acorde
        echo 'Ítem actualizado correctamente.';
    } else {
        echo "Error al actualizar ítem: " . $conexion->error;
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// ELIMINAR
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["borrar"]) && isset($_POST["id"])) {//nos aseguramos que la solicitud sea POST y borrar, y el id
    $id = intval($_POST["id"]); //convertimos el id recivido a entero
    $sql = "DELETE FROM menu WHERE id_menu = $id"; //guardamos la consulta en una variable

    if ($conexion->query($sql)) { //condicional que ejecuta y se fija que funcione y responde acorde
        echo 'Ítem eliminado correctamente.';
    } else {
        echo "Error al eliminar ítem: " . $conexion->error;
    }

    $conexion->close();
    exit;
}
