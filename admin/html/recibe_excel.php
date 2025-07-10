<?php
$tipo       = $_FILES['dataCliente']['type'];
$tamanio    = $_FILES['dataCliente']['size'];
$archivotmp = $_FILES['dataCliente']['tmp_name'];
$lineas     = file($archivotmp);
$i = 0;
?>

<!-- Contenedor principal con estilo -->
<div style="max-width: 600px; margin: 50px auto; padding: 30px; background-color: #f4f8fb; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; font-family: 'Segoe UI', sans-serif;">

  <h2 style="color: #2c3e50;">✅ ¡Carga Exitosa!</h2>
  <p style="font-size: 18px; color: #34495e;">
    Se han cargado correctamente los siguientes registros:
  </p>

<?php
foreach ($lineas as $linea) {
    $cantidad_registros = count($lineas);
    $cantidad_regist_agregados =  ($cantidad_registros - 1);

    if ($i != 0) {
        $datos = explode(";", $linea);

        $nombre      = !empty($datos[0])  ? ($datos[0]) : '';
        $telefono    = !empty($datos[1])  ? ($datos[1]) : '';
        $tipoSangre  = !empty($datos[2])  ? ($datos[2]) : '';
        $alergias    = !empty($datos[3])  ? ($datos[3]) : '';
        $espacio     = !empty($datos[4])  ? ($datos[4]) : '';
        ?>
        <script>
          db = firebase.database();
          ruta = db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child("BeeplayAlumnos").child(sessionStorage.getItem("idEscuela")).child("Alumnos");
          data = {
            NombreAlumno: "<?php echo $nombre ?>",
            TelefonoEmergencia: "<?php echo $telefono ?>",
            TipoSangre: "<?php echo $tipoSangre ?>",
            Alergias: "<?php echo $alergias ?>"
          };
          id = new Date().getTime();
          ruta.child(id).update(data);
        </script>
        <?php
    }
    $i++;
}
?>

  <p style="font-size: 24px; font-weight: bold; color: #27ae60;">
    <?php echo $cantidad_regist_agregados; ?> alumno(s) cargado(s) exitosamente.
  </p>

  <!-- Botón de regreso estilizado -->
  <a href="Alumnos.php" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #3498db; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s;">
    ⬅ Volver a Alumnos
  </a>

</div>

<?php include('Footer.php') ?>
