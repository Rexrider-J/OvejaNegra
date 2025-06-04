<?php
include("config_BDD.php");

// AGREGAR UN NUEVO ÍTEM
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["submit"])) {
    $nombre = trim($_POST["nombre"]);
    $precio = $_POST["precio"];
    $categoria = trim($_POST["categoria"]);
    $descripcion = trim($_POST["descripcion"]);
    $ruta_imagen = trim($_POST["ruta_imagen"]);

    if (empty($nombre) || empty($precio) || empty($categoria)) {
        exit("<script>alert('Por favor complete todos los campos requeridos.'); history.back();</script>");
    }

    $stmt = $conexion->prepare("INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $nombre, $precio, $categoria, $descripcion, $ruta_imagen);

    if ($stmt->execute()) {
        echo "<script>alert('Ítem agregado exitosamente.'); window.location.href = 'agregar_item.php';</script>";
    } else {
        echo "<p>Error al agregar ítem: " . $conexion->error . "</p>";
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// ACTUALIZAR UN ÍTEM EXISTENTE
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["edit"])) {
    $id = intval($_POST["id"]);
    $nombre = trim($_POST["nombre"]);
    $precio = $_POST["precio"];
    $categoria = trim($_POST["categoria"]);
    $descripcion = trim($_POST["descripcion"]);
    $ruta_imagen = trim($_POST["ruta_imagen"]);

    if (empty($id) || empty($nombre) || empty($precio) || empty($categoria)) {
        exit("<script>alert('Todos los campos son obligatorios.'); window.location.href = 'miperfil.html';</script>");
    }

    $stmt = $conexion->prepare("UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?");
    $stmt->bind_param("sdsssi", $nombre, $precio, $categoria, $descripcion, $ruta_imagen, $id);

    if ($stmt->execute()) {
        echo "<script>alert('Ítem actualizado correctamente.'); window.location.href = 'miperfil.html';</script>";
    } else {
        echo "<p>Error al actualizar ítem: " . $conexion->error . "</p>";
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// ELIMINAR
if (isset($_GET["action"]) && $_GET["action"] === "delete" && isset($_GET["id"])) {
    $id = intval($_GET["id"]);
    $sql = "DELETE FROM menu WHERE id_menu = $id";

    if ($conexion->query($sql)) {
        echo "<script>alert('Ítem eliminado correctamente.'); window.location.href = 'miperfil.html';</script>";
    } else {
        echo "<p>Error al eliminar ítem: " . $conexion->error . "</p>";
    }

    $conexion->close();
    exit;
}