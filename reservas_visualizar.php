<?php
require_once("config_BDD.php");

// Datos del empleado
$idEmpleado = $_POST['idEmpleado'] ?? null;
$puesto = $_POST['puesto'] ?? null;
$idLocalEmpleado = $_POST['idLocal'] ?? null;

// OBTENER MESAS DISPONIBLES PARA CAMBIO
if (isset($_POST['accion']) && $_POST['accion'] === 'obtener_mesas_disponibles') {
  $fecha = $_POST['fecha_reserva'];
  $cant = intval($_POST['cant_personas']);
  $idLocal = intval($_POST['id_local']);
  $idMesaActual = intval($_POST['id_mesa_actual']);

  $sql = "SELECT m.id_mesa, m.descripcion, m.cupo_maximo
          FROM mesas m
          WHERE m.id_local = ? AND m.cupo_maximo >= ?
            AND m.id_mesa NOT IN (
              SELECT r.id_mesa
              FROM reservas r
              JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
              WHERE r.fecha_reserva = ?
                AND e.estados = 'reservada'
            )
            AND m.id_mesa != ?";

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param("iisi", $idLocal, $cant, $fecha, $idMesaActual);
  $stmt->execute();
  $res = $stmt->get_result();

  $mesas = [];
  while ($row = $res->fetch_assoc()) {
    $mesas[] = $row;
  }

  echo json_encode($mesas);
  exit;
}

// CONFIRMAR CAMBIO DE MESA
if (isset($_POST['accion']) && $_POST['accion'] === 'cambiar_mesa') {
  $idReserva = intval($_POST['id_reserva']);
  $nuevaMesa = intval($_POST['nueva_mesa']);
  $mesaAnterior = intval($_POST['mesa_anterior']);
  $idEmpleado = intval($_POST['id_empleado']);

  $sql = "UPDATE reservas
          SET id_mesa = ?, 
              cambio_mesa = ?, 
              modificado_cancelado_por = ?, 
              tipo_modificado_cancelado = 'empleado',
              fecha_modificacion_cancelacion = NOW()
          WHERE id_reserva = ?";

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param("iiii", $nuevaMesa, $mesaAnterior, $idEmpleado, $idReserva);

  if ($stmt->execute()) {
    echo "✅ Reserva actualizada con nueva mesa.";
  } else {
    http_response_code(500);
    echo "❌ Error al cambiar mesa.";
  }
  exit;
}

// CAMBIAR ESTADO DE LA RESERVA
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id_reserva'], $_POST['estado'])) {
  $id_reserva = intval($_POST['id_reserva']);
  $nuevo_estado = $_POST['estado'];
  $id_empleado = $_POST['id_empleado'] ?? null;
  $motivo = $_POST['motivo'] ?? null;

  if (!$id_empleado || !$id_reserva || !$nuevo_estado) {
    http_response_code(400);
    exit("❌ Datos inválidos.");
  }

  $stmt_estado = $conexion->prepare("SELECT id_estado_reserva FROM estado_reserva WHERE estados = ?");
  $stmt_estado->bind_param("s", $nuevo_estado);
  $stmt_estado->execute();
  $res_estado = $stmt_estado->get_result();

  if ($res_estado->num_rows !== 1) {
    http_response_code(400);
    exit("❌ Estado inválido.");
  }

  $id_estado = $res_estado->fetch_assoc()['id_estado_reserva'];

  $stmt = $conexion->prepare("UPDATE reservas 
        SET id_estado_reserva = ?, 
            fecha_modificacion_cancelacion = NOW(), 
            modificado_cancelado_por = ?, 
            tipo_modificado_cancelado = 'empleado',
            motivo_cancelacion = ?
        WHERE id_reserva = ?");
  $stmt->bind_param("iisi", $id_estado, $id_empleado, $motivo, $id_reserva);

  if ($stmt->execute()) {
    echo "✅ Estado actualizado correctamente.";
  } else {
    echo "❌ Error al actualizar: " . $stmt->error;
  }
  exit;
}

// BÚSQUEDA HISTÓRICA
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['columna'])) {
  $columna = $_POST['columna'];
  $valor = trim($_POST['valor'] ?? '');

  $columnas_validas = [
    'dni' => 'c.dni',
    'mail' => 'c.mail',
    'fecha_reserva' => 'r.fecha_reserva',
    'nombre' => 'c.nombre',
    'apellido' => 'c.apellido'
  ];

  if (!array_key_exists($columna, $columnas_validas)) {
    http_response_code(400);
    exit("❌ Columna no válida.");
  }

  $columna_sql = $columnas_validas[$columna];
  $like = "%$valor%";

  if ($puesto !== 'Gerente' && $puesto !== 'Subgerente') {
    $sql = "SELECT r.*, 
                c.nombre AS nombre_cliente, 
                c.apellido AS apellido_cliente, 
                c.dni, 
                c.mail, 
                m.descripcion AS mesa_desc, 
                e.estados, 
                l.nombre AS nombre_local
          FROM reservas r
          JOIN clientes c ON r.id_cliente = c.id_cliente
          JOIN mesas m ON r.id_mesa = m.id_mesa
          JOIN locales l ON m.id_local = l.id_local
          JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
          WHERE $columna_sql LIKE ?
            AND m.id_local = ?
          ORDER BY r.fecha_reserva DESC";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("si", $like, $idLocalEmpleado);
  } else {
    $sql = "SELECT r.*, 
                c.nombre AS nombre_cliente, 
                c.apellido AS apellido_cliente, 
                c.dni, 
                c.mail, 
                m.descripcion AS mesa_desc, 
                e.estados, 
                l.nombre AS nombre_local
          FROM reservas r
          JOIN clientes c ON r.id_cliente = c.id_cliente
          JOIN mesas m ON r.id_mesa = m.id_mesa
          JOIN locales l ON m.id_local = l.id_local
          JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
          WHERE $columna_sql LIKE ?
          ORDER BY r.fecha_reserva DESC";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $like);
  }
  $stmt->execute();
  $res = $stmt->get_result();

  echo "<h5>Resultados de búsqueda histórica</h5>";
  mostrarTablaReservas($res, false);
  exit;
}

// VISUALIZAR RESERVAS DEL DÍA
$hoy = date('Y-m-d');

if ($puesto !== 'Gerente' && $puesto !== 'Subgerente') {
  $sql = "SELECT r.*, 
                 c.nombre AS nombre_cliente, 
                 c.apellido AS apellido_cliente, 
                 c.dni, 
                 c.mail, 
                 m.descripcion AS mesa_desc, 
                 e.estados,
                 m_anterior.descripcion AS mesa_anterior 
          FROM reservas r
          JOIN clientes c ON r.id_cliente = c.id_cliente
          JOIN mesas m ON r.id_mesa = m.id_mesa
          LEFT JOIN mesas m_anterior ON r.cambio_mesa = m_anterior.id_mesa
          JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
          WHERE DATE(r.fecha_reserva) = ?
            AND e.estados = 'reservada'
            AND m.id_local = ?
          ORDER BY r.fecha_reserva ASC";

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param("si", $hoy, $idLocalEmpleado);
} else {
  $sql = "SELECT r.*, 
                 c.nombre AS nombre_cliente, 
                 c.apellido AS apellido_cliente, 
                 c.dni, 
                 c.mail, 
                 m.descripcion AS mesa_desc, 
                 e.estados,
                 m_anterior.descripcion AS mesa_anterior 
          FROM reservas r
          JOIN clientes c ON r.id_cliente = c.id_cliente
          JOIN mesas m ON r.id_mesa = m.id_mesa
          LEFT JOIN mesas m_anterior ON r.cambio_mesa = m_anterior.id_mesa
          JOIN estado_reserva e ON r.id_estado_reserva = e.id_estado_reserva
          WHERE DATE(r.fecha_reserva) = ?
            AND e.estados = 'reservada'
          ORDER BY r.fecha_reserva ASC";

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param("s", $hoy);
}

$stmt->execute();
$res = $stmt->get_result();

// Input de búsqueda
echo "<input id='inputBuscarReservasEmpleado' oninput='filtrarReservas()' class='form-control mb-3' placeholder='Buscar...'>";
mostrarTablaReservas($res, true);

// Formulario de búsqueda histórica
?>
<hr>
<form id="formBuscarHistorico" onsubmit="return buscarReservas(event)">
  <label for="columna">Buscar por:</label>
  <select name="columna" required>
    <option value="dni">DNI</option>
    <option value="mail">Mail</option>
    <option value="nombre">Nombre</option>
    <option value="apellido">Apellido</option>
    <option value="fecha_reserva">Fecha</option>
  </select>
  <input type="text" name="valor" placeholder="Ingrese valor..." required>
  <input type="submit" value="Buscar">
</form>
<div id="resultadoBusquedaReservas"></div>

<?php
function mostrarTablaReservas($res, $conBotones)
{
  echo "<table class='table table-bordered table-striped'>";
  echo "<thead><tr>
          <th>Cliente</th>
          <th>DNI / Mail</th>
          <th>Mesa</th>
          <th>Fecha</th>
          <th>Observaciones</th>
          <th>Personas</th>
          <th>Estado</th>
          <th>Cambio Mesa</th>";
  if ($conBotones) echo "<th>Acciones</th>";
  echo "</tr></thead><tbody>";

  while ($row = $res->fetch_assoc()) {
    echo "<tr class='reserva-row'>
            <td>{$row['nombre_cliente']} {$row['apellido_cliente']}</td>
            <td>{$row['dni']}<br>{$row['mail']}</td>
            <td>{$row['mesa_desc']}</td>
            <td>{$row['fecha_reserva']}</td>
            <td>{$row['observaciones']}</td>
            <td>{$row['cant_personas']}</td>
            <td>{$row['estados']}</td>
            <td>" . ($row['mesa_anterior'] ?? '-') . "</td>";
    if ($conBotones) {
      echo "<td>
          <button class='btn btn-success btn-sm' onclick=\"cambiarEstadoReserva({$row['id_reserva']}, 'realizada/concretada')\">Concretar</button>
          <button class='btn btn-danger btn-sm' onclick=\"cambiarEstadoReserva({$row['id_reserva']}, 'realizada/anulada')\">Anular</button>
          <button class='btn btn-warning btn-sm' onclick='mostrarCambioMesa(" . htmlspecialchars(json_encode([
        "id_reserva" => $row['id_reserva'],
        "id_mesa" => $row['id_mesa'],
        "fecha_reserva" => $row['fecha_reserva'],
        "cant_personas" => $row['cant_personas']
      ]), ENT_QUOTES, 'UTF-8') . ")'>Cambiar mesa</button>
        </td>";
    } else {
      // Armar objeto con los campos esperados por el JS
      $reserva_obj = [
        "fecha_reserva" => $row['fecha_reserva'],
        "nombre_local" => $row['nombre_local'] ?? '-',
        "descripcion_mesa" => $row['mesa_desc'] ?? '-',
        "cant_personas" => $row['cant_personas'],
        "observaciones" => $row['observaciones'] ?? '-',
        "estado_reserva" => $row['estados'],
        "modif_canc_por" => $row['modificado_cancelado_por'] ?? '-',
        "motivo_cancelacion" => $row['motivo_cancelacion'] ?? '-',
        "fecha_modificacion" => $row['fecha_modificacion_cancelacion'] ?? '-'
      ];

      // Convertir a string JS seguro
      $reservaJS = htmlspecialchars(json_encode($reserva_obj), ENT_QUOTES, 'UTF-8');

      echo "<td>
          <button class='btn btn-info btn-sm' onclick='verDetalleReserva($reservaJS, this)'>Ver detalle</button>
        </td>";
    }
    echo "</tr>";
  }

  echo "</tbody></table>";
}
?>