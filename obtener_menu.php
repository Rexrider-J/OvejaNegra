<?php
include("config_BDD.php");

$idLocalEmpleado = $_POST['id_local_empleado'] ?? null;
$puestoEmpleado = $_POST['puesto_empleado'] ?? null;

if (!$idLocalEmpleado || !$puestoEmpleado) {
  exit("❌ Faltan datos del empleado.");
}

$sql = "SELECT id_menu, nombre, precio, categoria, descripcion, ruta_imagen FROM menu"; // preparamos la consulta
$result = $conexion->query($sql); // y la ejecutamos (trae todos los items de la tabla menu)
?>

<!-- Formularo para agregar items -->
<div class="list-group" id="contenedor-menu">
  <button id="btn-subir" title="Volver arriba">↑</button>
  <h4>Agregar nuevo ítem</h4>
  <form method="POST" action="acciones_menu.php" id="form-agregar-menu" enctype="multipart/form-data">
    <div class="row">

      <div class="col-md-3">
        <label>Nombre</label>
        <input type="text" name="nombre" class="form-control form-control-sm" required>
      </div>

      <div class="col-md-2">
        <label>Precio</label>
        <input type="number" step="0.01" name="precio" class="form-control form-control-sm" required>
      </div>

      <div class="col-md-3">
        <label>Categoría</label>
        <select name="categoria" class="form-control form-control-sm" required>
          <option value="">Seleccionar</option>
          <option>Cafeteria</option>
          <option>Panaderia</option>
          <option>Milkshake</option>
          <option>Waffles</option>
          <option>Starters</option>
          <option>Burgers</option>
          <option>Adicionales</option>
          <option>Milanesas</option>
          <option>Hotdogs</option>
          <option>Ensaladas</option>
          <option>Bebidas</option>
          <option>Postres</option>
        </select>
      </div>

      <div class="col-md-4">
        <label>Descripción</label>
        <input type="text" name="descripcion" class="form-control form-control-sm">
      </div>

      <div class="col-md-6 mt-2">
        <label>Imagen</label>
        <input type="file" name="imagen" class="form-control form-control-sm" accept="image/*">
      </div>

      <div class="col-md-12 mt-2">
        <label class="form-label">Disponibilidad inicial por local:</label>
        <div class="form-check">
          <?php
          $resLocales = $conexion->query("SELECT id_local, nombre FROM locales");

          while ($local = $resLocales->fetch_assoc()) {
            $id = $local['id_local'];
            $nombre = htmlspecialchars($local['nombre']);
            $checked = ($puestoEmpleado === 'Gerente' || $puestoEmpleado === 'Subgerente' || $id == $idLocalEmpleado) ? 'checked' : '';
            $disabled = ($puestoEmpleado === 'Subgerente' && $id != $idLocalEmpleado) ? 'disabled' : '';

            echo "
        <div class='form-check form-check-inline'>
          <input class='form-check-input' type='checkbox' name='disponibilidad[$id]' value='1' id='crear_disp_$id' $checked $disabled>
          <label class='form-check-label' for='crear_disp_$id'>$nombre</label>
        </div>
      ";
          }
          ?>
        </div>
      </div>
      <div class="col-md-6 mt-4 d-flex align-items-end">
        <button type="submit" class="btn btn-primary btn-sm">Agregar ítem</button>
      </div>
    </div>
  </form>
  <hr>

  <div class="mb-3"> <!-- el input para la búsqueda -->
    <input type="text" id="busqueda" onkeyup="filtrarMenu()" class="form-control" placeholder="Buscar en el menú...">
  </div>
  <div class="contenedor-items-del-menu">
    <?php
    if ($result && $result->num_rows > 0) { // verifica que haya resultados y los recorre si los hay
      while ($fila = $result->fetch_assoc()) {
    ?>
        <div class="list-group-item menu-item">
          <form method="POST" action="acciones_menu.php">
            <div class="row align-items-center">

              <div class="col-md-2">
                <img src="<?= htmlspecialchars($fila['ruta_imagen']) ?>" alt="<?= htmlspecialchars($fila['nombre']) ?>" class="img-fluid rounded" style="max-height:100px;">
              </div>

              <div class="col-md-7">
                <input type="hidden" name="id" value="<?= $fila['id_menu'] ?>">
                <div class="mb-2">
                  <label class="form-label">Nombre</label>
                  <input type="text" name="nombre" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['nombre']) ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Precio</label>
                  <input type="number" name="precio" step="0.01" class="form-control form-control-sm" value="<?= $fila['precio'] ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Categoría</label>
                  <input type="text" name="categoria" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['categoria']) ?>">
                </div>

                <div class="mb-2">
                  <label class="form-label">Descripción</label>
                  <textarea name="descripcion" rows="2" class="form-control form-control-sm"><?= htmlspecialchars($fila['descripcion']) ?></textarea>
                </div>

                <div class="mb-2">
                  <label class="form-label">URL Imagen</label>
                  <input type="text" name="ruta_imagen" class="form-control form-control-sm" value="<?= htmlspecialchars($fila['ruta_imagen']) ?>">
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label">Disponibilidad por local:</label>
                <div class="form-check">
                  <?php
                  $idMenu = $fila['id_menu'];
                  $queryLocales = $conexion->query("SELECT id_local, nombre FROM locales");

                  while ($local = $queryLocales->fetch_assoc()) {
                    $idLocal = $local['id_local'];
                    $nombreLocal = htmlspecialchars($local['nombre']);

                    // Consultar si está disponible ese ítem en ese local
                    $dispoQuery = $conexion->prepare("SELECT estado_disponibilidad FROM local_menu WHERE id_menu = ? AND id_local = ?");
                    $dispoQuery->bind_param("ii", $idMenu, $idLocal);
                    $dispoQuery->execute();
                    $dispoRes = $dispoQuery->get_result();
                    $estado = ($dispoRes->fetch_assoc()['estado_disponibilidad'] ?? '') === 'disponible';
                    $disabled = ($puestoEmpleado === 'Subgerente' && $idLocal != $idLocalEmpleado) ? 'disabled' : '';
                    $title = ($disabled) ? "title='Solo podés modificar tu propio local'" : '';


                    // Determinar si debe estar deshabilitado
                    $disabled = ($puestoEmpleado === 'Subgerente' && $idLocal != $idLocalEmpleado) ? 'disabled' : '';
                  ?>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" name="disponibilidad[<?= $idLocal ?>]" value="1"
                        id="disp_<?= $idMenu ?>_<?= $idLocal ?>" <?= $estado ? 'checked' : '' ?> <?= $disabled ?>>
                      <label class="form-check-label" for="disp_<?= $idMenu ?>_<?= $idLocal ?>">
                        <?= $nombreLocal ?>
                      </label>
                    </div>
                  <?php
                    $dispoQuery->close();
                  }
                  ?>
                </div>
              </div>

              <div class="col-md-3">
                <button type="button" name="edit" class="btn btn-sm btn-success mb-2">Actualizar</button><br>
                <button type="button" class="btn btn-sm btn-danger eliminar-item" data-id="<?= $fila['id_menu'] ?>">Eliminar</button>
              </div>
            </div>
          </form>
        </div>
    <?php
      }
    } else { // si no hay resultados, mustra los siguiente
      echo "<p>No hay ítems en el menú.</p>";
    }
    $conexion->close();
    ?>
  </div>
</div>