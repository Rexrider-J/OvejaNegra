<?php
session_start();
require_once("config_BDD.php");

if (!isset($conexion) || $conexion === null) {  // verifico conexión
    die("Error de conexión con la base de datos.");
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") { // solo acepto método POST
    http_response_code(405);
    die("Método no permitido.");
}

if (!isset($_POST['accion'])) { // Verifico que se recibió una acción
    http_response_code(400);
    die("Falta acción.");
}

if ($_POST['accion'] === 'registro') { // REGISTRO DE CLIENTE
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $dni = $_POST['dni'];
    $fecha_nac = $_POST['fecha_nacimiento'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $contrasena = $_POST['contraseña'];

    // verificar que los campos no estén vacíos
    if (empty($nombre) || empty($apellido) || empty($dni) || empty($fecha_nac) || empty($telefono) || empty($email) || empty($contrasena)) {
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    // preparo el insert en base de datos
    $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, fecha_nacimiento, telefono, mail, contrasena)
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Error en prepare(): " . $conexion->error);
    }

    // vinculo parametros para la consulta
    $stmt->bind_param("ssissss", $nombre, $apellido, $dni, $fecha_nac, $telefono, $email, $contrasena);

    if ($stmt->execute()) { // chequeo que se ejecute la consulta
        echo "✅ ¡Registro exitoso! Ya podés iniciar sesión.";
    } else {
        echo "❌ Error al registrar: " . $stmt->error; //envio un mensaje y el error si lo hubiese
    }

    $stmt->close(); // cierro consulta
    $conexion->close(); // cierro conexion
    exit;
} elseif ($_POST['accion'] === 'login') { // INICIO DE SESIÓN DE CLIENTE
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contrasena = $_POST['contraseña'];

    if (empty($email) || empty($dni) || empty($contrasena)) { // verificar que los campos no estén vacíos
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    // con prepare preparamos una consulta segura 
    $stmt = $conexion->prepare("SELECT * FROM clientes WHERE mail = ? AND dni = ? AND contrasena = ?");
    if (!$stmt) { // por si falla la consulta
        die("Error en prepare(): " . $conexion->error); // die mata la ejecucion del codigo
    }

    $stmt->bind_param("sis", $email, $dni, $contrasena); // vinculo parametros para la consulta
    $stmt->execute(); // ejecuto la consulta
    $res = $stmt->get_result(); // igualo el resultado de la consulta a la variable $res

    if ($res->num_rows === 1) { // verifico que se encontro al cliente
        $usuario = $res->fetch_assoc();
        // guardo datos del cliente en la variable global _SESSION
        // $_SESSION['id_cliente'] = $usuario['id_cliente'];
        // $_SESSION['nombre'] = $usuario['nombre'];
        echo "✅"
            . "|id_cliente=" . $usuario['id_cliente']
            . "|nombre=" . $usuario['nombre']
            . "|apellido=" . $usuario['apellido']
            . "|dni=" . $usuario['dni']
            . "|email=" . $usuario['mail']
            . "|telefono=" . $usuario['telefono']
            . "|fecha_nacimiento=" . $usuario['fecha_nacimiento']
            . "|contrasena=" . $usuario['contrasena'];
    } else {
        echo "❌ Credenciales incorrectas."; // por si no se encontro el cliente
    }

    $stmt->close(); // cierro consulta
    $conexion->close(); // cierro conexion
    exit;
} elseif ($_POST['accion'] === 'login_empleado') { // INICIO DE SESIÓN DE EMPLEADO
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $contrasena = $_POST['contraseña'];


    if (empty($email) || empty($dni) || empty($contrasena)) { // verificar que los campos no estén vacíos
        echo "❗ Todos los campos son obligatorios.";
        exit;
    }

    // con prepare preparamos una consulta segura 
    $stmt = $conexion->prepare("SELECT * FROM empleados WHERE mail = ? AND dni = ? AND contrasena = ?");

    if (!$stmt) { // por si falla la consulta
        die("Error en prepare(): " . $conexion->error); // die mata la ejecucion del codigo
    }

    $stmt->bind_param("sis", $email, $dni, $contrasena); // vinculo parametros 
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 1) { // verifico que se encontro el empleado 
        $empleado = $res->fetch_assoc();

        /* $_SESSION['id_empleado'] = $empleado['id_empleado'];// guardo datos del empleado en la variable global SESSION
        $_SESSION['nombre'] = $empleado['nombre']; */

        echo "✅"
            . "|id_empleado=" . $empleado['id_empleado']
            . "|nombre=" . $empleado['nombre']
            . "|apellido=" . $empleado['apellido']
            . "|dni=" . $empleado['dni']
            . "|email=" . $empleado['mail']
            . "|puesto=" . $empleado['puesto']
            . "|contrasena=" . $empleado['contrasena']
            . "|id_local=" . $empleado['id_local'];
    } else {
        echo "❌ Credenciales incorrectas."; // no se encontro el empleado
    }

    $stmt->close(); // cierro consulta
    $conexion->close(); // cierro conexion
    exit;
}

// Acción desconocida
else {
    http_response_code(400);
    echo "Acción no reconocida.";
    exit;
}
