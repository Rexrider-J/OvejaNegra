<?php
include("config_BDD.php");
mysqli_report(MYSQLI_REPORT_OFF); // desactiva errores fatales, para evitar "<b>Fatal error</b>: Uncaught mysqli_sql_exception: "

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("⛔ Acceso no permitido.");
}

// AGREGAR UN NUEVO ÍTEM
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["submit"])) { //nos aseguramos que la solicitud sea POST y submit
    $nombre = trim($_POST["nombre"]); //obtenemos los datos enviados del form
    $precio = $_POST["precio"];
    $categoria = trim($_POST["categoria"]);
    $categoriasValidas = [
        'Cafeteria', 'Panaderia', 'Milkshake', 'Waffles', 'Starters',
        'Burgers', 'Adicionales', 'Milanesas', 'Hotdogs', 'Ensaladas',
        'Bebidas', 'Postres'
    ];

    if (!in_array($categoria, $categoriasValidas)) {
        exit("❌ Categoría inválida. Elegí una opción del listado permitido.");
    }
    $descripcion = trim($_POST["descripcion"]);
    $ruta_imagen = null;
    if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        exit("❌ Debés subir una imagen para el ítem.");
    }

    $nombreTemporal = $_FILES['imagen']['tmp_name'];
    $nombreArchivo = basename($_FILES['imagen']['name']);

    // Validar tipo MIME
    $mime = mime_content_type($nombreTemporal);
    $tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!in_array($mime, $tiposPermitidos)) {
        exit("❌ Solo se permiten imágenes JPG, PNG, WEBP o GIF.");
    }

    // Validar tamaño (ej: máximo 2MB)
    $pesoMaximo = 2 * 1024 * 1024; // 2MB
    if ($_FILES['imagen']['size'] > $pesoMaximo) {
        exit("❌ La imagen es demasiado grande. Máximo permitido: 2MB.");
    }

    // Validar dimensiones (ej: máximo 1000x1000 px)
    $dimensiones = getimagesize($nombreTemporal);
    $ancho = $dimensiones[0];
    $alto = $dimensiones[1];
    if ($ancho > 1000 || $alto > 1000) {
        exit("❌ La imagen es muy grande. Máximo permitido: 1000x1000 píxeles.");
    }

    // Crear nombre único y mover la imagen
    $nombreSeguro = uniqid() . "_" . preg_replace("/[^A-Za-z0-9.\-_]/", "", $nombreArchivo);
    $rutaDestino = "img/" . $nombreSeguro;

    if (!move_uploaded_file($nombreTemporal, $rutaDestino)) {
        exit("❌ Error al guardar la imagen.");
    }

    $ruta_imagen = $rutaDestino;

    // del empleado logueado
    $idLocalEmpleado = $_POST["id_local_empleado"] ?? null;
    $puestoEmpleado = $_POST["puesto_empleado"] ?? null;

    if (!$idLocalEmpleado || !$puestoEmpleado) {
        exit("❌ Faltan datos de sesión del empleado.");
    }

    if (empty($nombre) || empty($precio) || empty($categoria)) { // validamos que los campos relevantes no esten vacios
        exit("<script>alert('Por favor complete todos los campos requeridos.'); history.back();</script>");
    }

    //preparamos la consulta a SQL
    $stmt = $conexion->prepare("INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $nombre, $precio, $categoria, $descripcion, $ruta_imagen);

    if ($stmt->execute()) { //condicional que ejecuta y se fija que funcione y responde acorde
        $idMenuNuevo = $conexion->insert_id;

        $idMenuNuevo = $stmt->insert_id;

        // Insertar disponibilidad según checkboxes
        if (isset($_POST['disponibilidad']) && is_array($_POST['disponibilidad'])) {
            foreach ($_POST['disponibilidad'] as $idLocal => $valor) {
                $idLocal = intval($idLocal);

                // Si es Subgerente, solo permitir su propio local
                if ($puestoEmpleado === 'Subgerente' && $idLocal != $idLocalEmpleado) {
                    continue;
                }

                $stmtLocal = $conexion->prepare("INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES (?, ?, 'disponible')");
                $stmtLocal->bind_param("ii", $idMenuNuevo, $idLocal);
                $stmtLocal->execute();
                $stmtLocal->close();
            }
        }

        echo "✅ Ítem agregado correctamente en el local.";
    } else {
        switch ($conexion->errno) {
            case 1062:
                echo "⚠️ Hay un campo duplicado en el item que esta intentando crear.";
                break;
            case 1048:
                echo "⚠️ Hay un campo obligatorio que está vacío.";
                break;
            case 1452:
                echo "❌ No se puede vincular el ítem con su local (clave foránea inválida).";
                break;
            default:
                echo "❌ Error inesperado al agregar ítem. Código: " . $conexion->errno;
        }
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
    // del empleado logueado
    $idLocalEmpleado = $_POST["id_local_empleado"] ?? null;
    $puestoEmpleado = $_POST["puesto_empleado"] ?? null;

    if (empty($id) || empty($nombre) || empty($precio) || empty($categoria)) {// validamos que los campos relevantes no esten vacios
        exit("<script>alert('Todos los campos son obligatorios.'); window.location.href = 'miperfil.html';</script>");
    }

    //preparamos la consulta a SQL
    $stmt = $conexion->prepare("UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?");
    $stmt->bind_param("sdsssi", $nombre, $precio, $categoria, $descripcion, $ruta_imagen, $id);
    // Actualizar disponibilidad por local
    $idMenu = $id; // el ID del ítem actual
    $conexion->query("DELETE FROM local_menu WHERE id_menu = $idMenu");

    if (isset($_POST['disponibilidad']) && is_array($_POST['disponibilidad'])) {
        foreach ($_POST['disponibilidad'] as $idLocal => $valor) {
            $idLocal = intval($idLocal);

            // ❗ Subgerente solo puede modificar su local
            if ($puestoEmpleado === 'Subgerente' && $idLocal != $idLocalEmpleado) {
                continue;
            }

            $stmtDispo = $conexion->prepare("INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES (?, ?, 'disponible')");
            $stmtDispo->bind_param("ii", $idMenu, $idLocal);
            $stmtDispo->execute();
            $stmtDispo->close();
        }
    }

    if ($stmt->execute()) { //condicional que ejecuta y se fija que funcione y responde acorde
        echo '✅Ítem actualizado correctamente.';
    } else {
        echo "❌Error al actualizar ítem: " . $conexion->error;
    }

    $stmt->close();
    $conexion->close();
    exit;
}

// ELIMINAR
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["borrar"]) && isset($_POST["id"])) {//nos aseguramos que la solicitud sea POST y borrar, y el id
    $id = intval($_POST["id"]); //convertimos el id recivido a entero

    $conexion->begin_transaction(); // iniciamos transacción por seguridad
    try {
        $conexion->query("DELETE FROM local_menu WHERE id_menu = $id");//eliminamos primero las referencias en local_menu
        $conexion->query("DELETE FROM menu WHERE id_menu = $id");
        $conexion->commit();
        echo "✅ Ítem eliminado correctamente.";
    } catch (mysqli_sql_exception $e) {
        $conexion->rollback();
        echo "❌ Error al eliminar ítem: " . $e->getMessage();
    }

    $conexion->close();
    exit;
}
