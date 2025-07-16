<?php
include("config_BDD.php");

$tabla = $_POST['tabla'] ?? '';
$accion = $_POST['accion'] ?? '';
$id = $_POST['id'] ?? null;

switch ($accion) {
  case 'agregar':
    agregarRegistro($conexion, $tabla);
    break;
  case 'modificar':
    modificarRegistro($conexion, $tabla, $id);
    break;
  case 'borrar':
    eliminarRegistro($conexion, $tabla, $id);
    break;
  default:
    echo "Acción inválida.";
    break;
}
/*Función reutilizable para validar existencia en tablas*/
function existeEnTabla($conexion, $tabla, $columna, $valor)
{
  $stmt = $conexion->prepare("SELECT 1 FROM $tabla WHERE $columna = ? LIMIT 1");
  $stmt->bind_param("i", $valor);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->num_rows > 0;
}
function validarLongitudDni($dni)
{
  if (strlen($dni) < 7 || strlen($dni) > 11) {
    return "El DNI debe contener entre 7 y 11 dígitos.";
  }
  return true;
}
function validarValorDni($dni)
{
  if ((int)$dni <= 5000000) {
    return "El DNI debe ser mayor a 5 millones.";
  }
  return true;
}

function validarFormatoEmail($mail)
{
  if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    return "El email es inválido. Por favor ingresa un email válido.";
  }
  return true;
}

function existeMail($conexion, $mail, $id = null)
{
  $query = "SELECT id_empleado FROM empleados WHERE mail = ?";
  if ($id !== null) {
    $query .= " AND id_empleado != ?";
  }
  $stmt = $conexion->prepare($query);
  if ($id !== null) {
    $stmt->bind_param("si", $mail, $id);
  } else {
    $stmt->bind_param("s", $mail);
  }
  $stmt->execute();
  $stmt->store_result();
  $existe = $stmt->num_rows > 0;
  $stmt->close();
  return $existe;
}


function existeGerenteEnLocal($conexion, $id_local, $id = null)
{
  $query = "SELECT id_empleado FROM empleados WHERE puesto = 'Gerente' AND id_local = ?";
  if ($id !== null) {
    $query .= " AND id_empleado != ?";
  }
  $stmt = $conexion->prepare($query);
  if ($id !== null) {
    $stmt->bind_param("ii", $id_local, $id);
  } else {
    $stmt->bind_param("i", $id_local);
  }
  $stmt->execute();
  $stmt->store_result();
  $existe = $stmt->num_rows > 0;
  $stmt->close();
  return $existe;
}

function existeLocal($conexion, $id_local)
{
  $stmt = $conexion->prepare("SELECT 1 FROM locales WHERE id_local = ? LIMIT 1");
  $stmt->bind_param("i", $id_local);
  $stmt->execute();
  $stmt->store_result();
  $existe = $stmt->num_rows > 0;
  $stmt->close();
  return $existe;
}

function existeNombreApellidoDni($conexion, $nombre, $apellido, $dni, $id = null)
{
  $query = "SELECT id_empleado FROM empleados WHERE nombre = ? AND apellido = ? AND dni = ?";
  if ($id !== null) {
    $query .= " AND id_empleado != ?";
  }
  $stmt = $conexion->prepare($query);
  if ($id !== null) {
    $stmt->bind_param("ssii", $nombre, $apellido, $dni, $id);
  } else {
    $stmt->bind_param("ssi", $nombre, $apellido, $dni);
  }
  $stmt->execute();
  $stmt->store_result();
  $existe = $stmt->num_rows > 0;
  $stmt->close();
  return $existe;
}

// Función principal que usa las anteriores para validar el empleado
function validarEmpleado($conexion, $datos, $id = null)
{
  $dni = $datos['dni'];
  $mail = $datos['mail'];
  $puesto = $datos['puesto'];
  $id_local = $datos['id_local'];
  $nombre = $datos['nombre'];
  $apellido = $datos['apellido'];

  if (($res = validarLongitudDni($dni)) !== true) return $res;
  if (($res = validarValorDni($dni)) !== true) return $res;
  if (($res = validarFormatoEmail($mail)) !== true) return $res;
  if (!existeLocal($conexion, $id_local)) return "El local seleccionado no existe.";
  if (existeMail($conexion, $mail, $id)) return "Ya existe un empleado con ese mail.";
  if (existeNombreApellidoDni($conexion, $nombre, $apellido, $dni, $id)) {
    return "Ya existe un empleado con el mismo nombre, apellido y DNI.";
  }
  if (strtolower($puesto) === 'gerente' && existeGerenteEnLocal($conexion, $id_local, $id)) {
    return "Ya existe un gerente en ese local.";
  }

  return true;
}
function validarCliente($conexion, $datos, $id = null)
{
  // Validar DNI
  $dniValidacion = validarLongitudDni($datos['dni']);
  if ($dniValidacion !== true) return $dniValidacion;

  $dniValorValidacion = validarValorDni($datos['dni']);
  if ($dniValorValidacion !== true) return $dniValorValidacion;

  // Validar email
  $emailValidacion = validarFormatoEmail($datos['mail']);
  if ($emailValidacion !== true) return $emailValidacion;

  // Verificar si el mail ya existe (en tabla clientes)
  $queryMail = "SELECT id_cliente FROM clientes WHERE mail = ?";
  if ($id !== null) {
    $queryMail .= " AND id_cliente != ?";
    $stmt = $conexion->prepare($queryMail);
    $stmt->bind_param("si", $datos['mail'], $id);
  } else {
    $stmt = $conexion->prepare($queryMail);
    $stmt->bind_param("s", $datos['mail']);
  }
  $stmt->execute();
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    $stmt->close();
    return "Ya existe un cliente con ese mail.";
  }
  $stmt->close();

  // Verificar si existe un cliente con el mismo DNI y mismos nombre y apellido
  $queryDni = "SELECT id_cliente FROM clientes WHERE nombre = ? AND apellido = ? AND dni = ?";
  if ($id !== null) {
    $queryDni .= " AND id_cliente != ?";
    $stmt = $conexion->prepare($queryDni);
    $stmt->bind_param("ssii", $datos['nombre'], $datos['apellido'], $datos['dni'], $id);
  } else {
    $stmt = $conexion->prepare($queryDni);
    $stmt->bind_param("ssi", $datos['nombre'], $datos['apellido'], $datos['dni']);
  }
  $stmt->execute();
  $stmt->store_result();
  if ($stmt->num_rows > 0) {
    $stmt->close();
    return "Ya existe un cliente con ese DNI, nombre y apellido.";
  }
  $stmt->close();

  // Validar teléfono (solo números y longitud 10–20)
  if (!preg_match('/^\d{10,20}$/', $datos['telefono'])) {
    return "El teléfono debe contener solo números y tener entre 10 y 20 dígitos.";
  }

  return true;
}
function esLunes($fechaHora)
{
  $fecha = new DateTime($fechaHora);
  return $fecha->format('N') == 1; // 1 = lunes
}

function agregarRegistro($conexion, $tabla)
{
  switch ($tabla) {
    case 'clientes':
      $datosCliente = [
        'nombre' => $_POST['nombre'],
        'apellido' => $_POST['apellido'],
        'dni' => $_POST['dni'],
        'mail' => $_POST['mail'],
        'telefono' => $_POST['telefono'],
        'fecha_nacimiento' => $_POST['fecha_nacimiento'],
        'contrasena' => $_POST['contrasena'],
      ];
      $validacion = validarCliente($conexion, $datosCliente);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }

      $stmt = $conexion->prepare("INSERT INTO clientes (nombre, apellido, dni, mail, telefono, fecha_nacimiento, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssissss", ...array_values($datosCliente));
      break;
    case 'empleados':
      $datosEmpleado = [
        'nombre' => $_POST['nombre'],
        'apellido' => $_POST['apellido'],
        'dni' => $_POST['dni'],
        'mail' => $_POST['mail'],
        'puesto' => $_POST['puesto'],
        'id_local' => $_POST['id_local'],
      ];
      $validacion = validarEmpleado($conexion, $datosEmpleado);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }
      $stmt = $conexion->prepare("INSERT INTO empleados (nombre, apellido, dni, mail, puesto, id_local, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("ssissis", $_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local'], $_POST['contrasena']);
      break;
    case 'menu':
      if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        echo "❌ Debés subir una imagen.";
        return;
      }

      // Validaciones
      $tmp = $_FILES['imagen']['tmp_name'];
      $mime = mime_content_type($tmp);
      $permitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!in_array($mime, $permitidos)) {
        echo "❌ Formato de imagen no permitido.";
        return;
      }

      $pesoMax = 2 * 1024 * 1024;
      if ($_FILES['imagen']['size'] > $pesoMax) {
        echo "❌ La imagen excede el tamaño permitido (2MB).";
        return;
      }

      $dim = getimagesize($tmp);
      if ($dim[0] > 1000 || $dim[1] > 1000) {
        echo "❌ Dimensiones máximas: 1000x1000 píxeles.";
        return;
      }

      // Guardar imagen
      $nombreSeguro = uniqid() . "_" . preg_replace("/[^A-Za-z0-9.\-_]/", "", $_FILES['imagen']['name']);
      $ruta = "img/" . $nombreSeguro;
      if (!move_uploaded_file($tmp, $ruta)) {
        echo "❌ Error al guardar la imagen.";
        return;
      }

      // Insertar registro
      $stmt = $conexion->prepare("INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES (?, ?, ?, ?, ?)");
      $stmt->bind_param("sdsss", $_POST['nombre'], $_POST['precio'], $_POST['categoria'], $_POST['descripcion'], $ruta);
      break;
    case 'locales':
      $stmt = $conexion->prepare("INSERT INTO locales (nombre, direccion, telefono, estado_disponibilidad) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("ssss", $_POST['nombre'], $_POST['direccion'], $_POST['telefono'], $_POST['estado_disponibilidad']);
      break;
    case 'local_menu':
      /*Validar que los IDs existan antes de insertar*/
      $id_menu = $_POST['id_menu'];
      $id_local = $_POST['id_local'];
      /*Validaciones*/
      if (!existeEnTabla($conexion, 'menu', 'id_menu', $id_menu)) {
        echo "❌ El ID del menú ($id_menu) no existe.";
        exit;
      }
      if (!existeEnTabla($conexion, 'locales', 'id_local', $id_local)) {
        echo "❌ El ID del local ($id_local) no existe.";
        exit;
      }
      /*Si pasa la validación, se prepara el insert*/
      $stmt = $conexion->prepare("INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES (?, ?, ?)");
      $stmt->bind_param("iis", $id_menu, $id_local, $_POST['estado_disponibilidad']);
      break;
    case 'mesas':
      // Validar existencia del local
      if (!existeEnTabla($conexion, 'locales', 'id_local', $_POST['id_local'])) {
        echo "❌ Error: El ID del local no existe.";
        return;
      }

      // Verificar unicidad (id_local + descripcion)
      $stmt_check = $conexion->prepare("SELECT 1 FROM mesas WHERE id_local = ? AND descripcion = ?");
      $stmt_check->bind_param("is", $_POST['id_local'], $_POST['descripcion']);
      $stmt_check->execute();
      $resultado = $stmt_check->get_result();

      if ($resultado->num_rows > 0) {
        echo "❌ Error: Ya existe una mesa con esa descripción en el local.";
        $stmt_check->close();
        return;
      }
      $stmt_check->close();

      // Insertar mesa si pasa validaciones
      $stmt = $conexion->prepare("INSERT INTO mesas (id_local, descripcion, cupo_maximo, estado) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("isis", $_POST['id_local'], $_POST['descripcion'], $_POST['cupo_maximo'], $_POST['estado']);
      break;
    case 'estado_reserva':
      $stmt = $conexion->prepare("INSERT INTO estado_reserva (estados) VALUES (?)");
      $stmt->bind_param("s", $_POST['estados']);
      break;
    case 'empleado_funcion':
      if (isset($_POST['fecha'], $_POST['hora'])) {
        $_POST['dia_hora'] = $_POST['fecha'] . ' ' . $_POST['hora'];
      }
      $dia_hora = $_POST['dia_hora'];
      $funcion = $_POST['funcion'];
      $id_empleado = (int)$_POST['id_empleado'];

      /*Validar si es lunes*/
      $fecha = new DateTime($dia_hora);
      if ($fecha->format('N') == 1) { // 1 = lunes
        echo "<script>alert('Los lunes el local se encuentra cerrado.');</script>";
        return false;
      }

      /*Verificar que el empleado exista*/
      if (!existeEnTabla($conexion, 'empleados', 'id_empleado', $id_empleado)) {
        echo "❌El ID del empleado no existe.";
        return false;
      }

      /*Valida combinación única id_empleado + dia_hora*/
      $stmtCheck = $conexion->prepare("SELECT 1 FROM empleado_funcion WHERE id_empleado = ? AND dia_hora = ? LIMIT 1");
      $stmtCheck->bind_param("is", $id_empleado, $dia_hora);
      $stmtCheck->execute();
      $resCheck = $stmtCheck->get_result();
      if ($resCheck->num_rows > 0) {
        echo "<script>alert('Este empleado ya tiene una función asignada en esa fecha y hora.');</script>";
        return false;
      }

      /*Si todo OK, preparar el insert*/
      $stmt = $conexion->prepare("INSERT INTO empleado_funcion (dia_hora, funcion, id_empleado) VALUES (?, ?, ?)");
      $stmt->bind_param("ssi", $dia_hora, $funcion, $id_empleado);
      break;
    case 'reservas':
      $stmt = $conexion->prepare("INSERT INTO reservas (id_cliente, id_mesa, fecha_reserva, observaciones, cant_personas, id_estado_reserva) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("iissii", $_POST['id_cliente'], $_POST['id_mesa'], $_POST['fecha_reserva'], $_POST['observaciones'], $_POST['cant_personas'], $_POST['id_estado_reserva']);
      break;
    default:
      echo "Tabla no soportada.";
      return;
  }
  if ($stmt->execute()) {
    echo "✅Registro agregado correctamente.";
  } else {
    echo "Error al agregar: " . $conexion->error;
  }
  $stmt->close();
}

function modificarRegistro($conexion, $tabla, $id)
{
  switch ($tabla) {
    case 'clientes':
      $datosCliente = [
        'nombre' => $_POST['nombre'],
        'apellido' => $_POST['apellido'],
        'dni' => $_POST['dni'],
        'mail' => $_POST['mail'],
        'telefono' => $_POST['telefono'],
        'fecha_nacimiento' => $_POST['fecha_nacimiento'],
      ];
      $validacion = validarCliente($conexion, $datosCliente, $id);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }

      $campos = "nombre=?, apellido=?, dni=?, mail=?, telefono=?, fecha_nacimiento=?";
      $tipos = "ssisss";
      $valores = array_values($datosCliente);

      if (!empty($_POST['contrasena'])) {
        $campos .= ", contrasena=?";
        $tipos .= "s";
        $valores[] = $_POST['contrasena'];
      }

      $sql = "UPDATE clientes SET $campos WHERE id_cliente=?";
      $tipos .= "i";
      $valores[] = $id;
      break;
    case 'empleados':
      $datosEmpleado = [
        'nombre' => $_POST['nombre'],
        'apellido' => $_POST['apellido'],
        'dni' => $_POST['dni'],
        'mail' => $_POST['mail'],
        'puesto' => $_POST['puesto'],
        'id_local' => $_POST['id_local'],
      ];
      $validacion = validarEmpleado($conexion, $datosEmpleado, $id);
      if ($validacion !== true) {
        echo $validacion;
        return;
      }
      $campos = "nombre=?, apellido=?, dni=?, mail=?, puesto=?, id_local=?";
      $tipos = "ssissi";
      $valores = [$_POST['nombre'], $_POST['apellido'], $_POST['dni'], $_POST['mail'], $_POST['puesto'], $_POST['id_local']];
      if (!empty($_POST['contrasena'])) {
        $campos .= ", contrasena=?";
        $tipos .= "s";
        $valores[] = $_POST['contrasena'];
      }
      $sql = "UPDATE empleados SET $campos WHERE id_empleado=?";
      $tipos .= "i";
      $valores[] = $id;
      break;
    case 'menu':
      $nombre = trim($_POST['nombre']);
      $precio = $_POST['precio'];
      $categoria = trim($_POST['categoria']);
      $descripcion = trim($_POST['descripcion']);
      $categoriasValidas = ['Cafeteria', 'Panaderia', 'Milkshake', 'Waffles', 'Starters', 'Burgers', 'Adicionales', 'Milanesas', 'Hotdogs', 'Ensaladas', 'Bebidas', 'Postres', 'Promo', 'Brunch'];

      if (!in_array($categoria, $categoriasValidas)) {
        echo "❌ Categoría inválida.";
        return;
      }
      $ruta_imagen = '';
      // Si no se sube nueva imagen, recuperar la actual desde la BDD
      if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        $stmt = $conexion->prepare("SELECT ruta_imagen FROM menu WHERE id_menu = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($ruta_imagen);
        $stmt->fetch();
        $stmt->close();
      } else {
        // Se subió una nueva imagen
        $nombreTemporal = $_FILES['imagen']['tmp_name'];
        $nombreArchivo = basename($_FILES['imagen']['name']);

        $mime = mime_content_type($nombreTemporal);
        $tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

        if (!in_array($mime, $tiposPermitidos)) {
          echo "❌ Solo se permiten imágenes JPG, PNG, WEBP o GIF.";
          return;
        }

        if ($_FILES['imagen']['size'] > 2 * 1024 * 1024) {
          echo "❌ La imagen es demasiado grande. Máximo 2MB.";
          return;
        }

        list($ancho, $alto) = getimagesize($nombreTemporal);
        if ($ancho > 1000 || $alto > 1000) {
          echo "❌ La imagen supera los 1000x1000 píxeles permitidos.";
          return;
        }

        $nombreSeguro = uniqid() . "_" . preg_replace("/[^A-Za-z0-9.\-_]/", "", $nombreArchivo);
        $rutaDestino = "img/" . $nombreSeguro;

        if (!move_uploaded_file($nombreTemporal, $rutaDestino)) {
          echo "❌ Error al guardar la imagen.";
          return;
        }

        $ruta_imagen = $rutaDestino;
      }

      $sql = "UPDATE menu SET nombre=?, precio=?, categoria=?, descripcion=?, ruta_imagen=? WHERE id_menu=?";
      $tipos = "sdsssi";
      $valores = [$nombre, $precio, $categoria, $descripcion, $ruta_imagen, $id];
      break;
    case 'locales':
      $sql = "UPDATE locales SET nombre=?, direccion=?, telefono=?, estado_disponibilidad=? WHERE id_local=?";
      $tipos = "ssssi";
      $valores = [$_POST['nombre'], $_POST['direccion'], $_POST['telefono'], $_POST['estado_disponibilidad'], $id];
      break;
    case 'local_menu':
      $id_menu = $_POST['id_menu'];
      $id_local = $_POST['id_local'];

      // Validar que los IDs existan antes de modificar
      if (!existeEnTabla($conexion, 'menu', 'id_menu', $id_menu)) {
        echo "❌ El ID del menú ($id_menu) no existe.";
        exit;
      }

      if (!existeEnTabla($conexion, 'locales', 'id_local', $id_local)) {
        echo "❌ El ID del local ($id_local) no existe.";
        exit;
      }

      // Si pasa validación, actualizar
      $sql = "UPDATE local_menu SET id_menu=?, id_local=?, estado_disponibilidad=? WHERE id_local_menu=?";
      $tipos = "iisi";
      $valores = [$id_menu, $id_local, $_POST['estado_disponibilidad'], $id];
      break;
    case 'mesas':
      // Validar existencia del local
      if (!existeEnTabla($conexion, 'locales', 'id_local', $_POST['id_local'])) {
        echo "❌ Error: El ID del local no existe.";
        return;
      }

      // Verificar unicidad (id_local + descripcion), excluyendo la mesa actual que se esta modificando
      $stmt_check = $conexion->prepare("SELECT 1 FROM mesas WHERE id_local = ? AND descripcion = ? AND id_mesa != ?");
      $stmt_check->bind_param("isi", $_POST['id_local'], $_POST['descripcion'], $id);
      $stmt_check->execute();
      $resultado = $stmt_check->get_result();

      if ($resultado->num_rows > 0) {
        echo "❌ Error: Ya existe una mesa con esa descripción en el local.";
        $stmt_check->close();
        return;
      }
      $stmt_check->close();

      // Actualizar si pasa validaciones
      $sql = "UPDATE mesas SET id_local=?, descripcion=?, cupo_maximo=?, estado=? WHERE id_mesa=?";
      $tipos = "isisi";
      $valores = [$_POST['id_local'], $_POST['descripcion'], $_POST['cupo_maximo'], $_POST['estado'], $id];
      break;
    case 'estado_reserva':
      $sql = "UPDATE estado_reserva SET estados=? WHERE id_estado_reserva=?";
      $tipos = "si";
      $valores = [$_POST['estados'], $id];
      break;
    case 'empleado_funcion':
      if (isset($_POST['fecha'], $_POST['hora'])) {
        $_POST['dia_hora'] = $_POST['fecha'] . ' ' . $_POST['hora'];
      }
      $dia_hora = $_POST['dia_hora'];
      $funcion = $_POST['funcion'];
      $id_empleado = (int)$_POST['id_empleado'];

      /*Validar si es lunes*/
      $fecha = new DateTime($dia_hora);
      if ($fecha->format('N') == 1) { // 1 = lunes
        echo "❌Los lunes el local se encuentra cerrado.";
        return false;
      }

      /*Verifica que el empleado exista*/
      if (!existeEnTabla($conexion, 'empleados', 'id_empleado', $id_empleado)) {
        echo "❌El ID del empleado no existe.";
        return false;
      }

      /*Validar que no exista otro registro con misma combinación id_empleado + dia_hora*/
      $stmtCheck = $conexion->prepare("SELECT 1 FROM empleado_funcion WHERE id_empleado = ? AND dia_hora = ? AND id_empleado_funcion != ? LIMIT 1");
      $stmtCheck->bind_param("isi", $id_empleado, $dia_hora, $id);
      $stmtCheck->execute();
      $resCheck = $stmtCheck->get_result();
      if ($resCheck->num_rows > 0) {
        echo "❌Este empleado ya tiene una función asignada en esa fecha y hora.";
        return false;
      }

      /*Si todo OK, preparar update*/
      $sql = "UPDATE empleado_funcion SET dia_hora=?, funcion=?, id_empleado=? WHERE id_empleado_funcion=?";
      $tipos = "ssii";
      $valores = [$dia_hora, $funcion, $id_empleado, $id];
      break;
    case 'reservas':
      $sql = "UPDATE reservas SET id_cliente=?, id_mesa=?, fecha_reserva=?, observaciones=?, cant_personas=?, id_estado_reserva=? WHERE id_reserva=?";
      $tipos = "iissiii";
      $valores = [$_POST['id_cliente'], $_POST['id_mesa'], $_POST['fecha_reserva'], $_POST['observaciones'], $_POST['cant_personas'], $_POST['id_estado_reserva'], $id];
      break;
    default:
      echo "Tabla no soportada.";
      return;
  }

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param($tipos, ...$valores);

  if ($stmt->execute()) {
    echo "✅Registro modificado correctamente.";
  } else {
    echo "Error al modificar: " . $conexion->error;
  }

  $stmt->close();
}

function eliminarRegistro($conexion, $tabla, $id)
{
  $id_col = match ($tabla) {
    'clientes' => 'id_cliente',
    'empleados' => 'id_empleado',
    'menu' => 'id_menu',
    'locales' => 'id_local',
    'local_menu' => 'id_local_menu',
    'mesas' => 'id_mesa',
    'estado_reserva' => 'id_estado_reserva',
    'empleado_funcion' => 'id_empleado_funcion',
    'reservas' => 'id_reserva',
    default => null
  };

  if (!$id_col) {
    echo "Tabla no soportada.";
    return;
  }

  /*Si es cliente, eliminar primero sus reservas*/
  if ($tabla === 'clientes') {
    $stmt = $conexion->prepare("DELETE FROM reservas WHERE id_cliente = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar reservas del cliente: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();
  }

  /*Si es empleado, eliminar dependencias de funciones*/
  if ($tabla === 'empleados') {
    $stmt = $conexion->prepare("DELETE FROM empleado_funcion WHERE id_empleado = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar dependencias: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();
  }

  if ($tabla === 'locales') {
    /*Eliminar reservas del local*/
    $stmt = $conexion->prepare("DELETE FROM reservas WHERE id_local = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar reservas del local: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();

    /*Eliminar mesas del local*/
    $stmt = $conexion->prepare("DELETE FROM mesas WHERE id_local = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar mesas del local: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();

    /*Eliminar empleados del local*/
    $stmt = $conexion->prepare("DELETE FROM empleados WHERE id_local = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar empleados del local: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();

    /*Eliminar menú del local*/
    $stmt = $conexion->prepare("DELETE FROM local_menu WHERE id_local = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar menú del local: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();
  }

  if ($tabla === 'menu') {  // si la tabla es menu, eliminar primero en local_menu
    $conexion->query("DELETE FROM local_menu WHERE id_menu = $id");
  }
  if ($tabla === 'mesas') {
    /*Eliminar reservas donde esta mesa fue usada directamente o como cambio*/
    $stmt = $conexion->prepare("DELETE FROM reservas WHERE id_mesa = ? OR cambio_mesa = ?");
    $stmt->bind_param("ii", $id, $id);
    if (!$stmt->execute()) {
      echo "Error al eliminar reservas asociadas a la mesa: " . $conexion->error;
      $stmt->close();
      return;
    }
    $stmt->close();
  }
  /*Eliminar registro principal*/
  $stmt = $conexion->prepare("DELETE FROM $tabla WHERE $id_col = ?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    echo "✅ Registro eliminado correctamente.";
  } else {
    echo "Error al eliminar: " . $conexion->error;
  }

  $stmt->close();
}
