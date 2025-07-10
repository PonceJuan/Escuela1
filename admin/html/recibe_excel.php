
<script>
  let nombre;
  let  db;
  let ruta;
  let data;
  let id;
  let IdEscuela = sessionStorage.getItem("idEscuela");
  let alergias;


</script>
<?php include ('Footer.php') ?>

<?php

$tipo       = $_FILES['dataCliente']['type'];
$tamanio    = $_FILES['dataCliente']['size'];
$archivotmp = $_FILES['dataCliente']['tmp_name'];
$lineas     = file($archivotmp);

$i = 0;

foreach ($lineas as $linea) {
    $cantidad_registros = count($lineas);
    $cantidad_regist_agregados =  ($cantidad_registros - 1);

    if ($i != 0) {

        $datos = explode(";", $linea);
       
        $nombre                = !empty($datos[0])  ? ($datos[0]) : '';
		$telefono                = !empty($datos[1])  ? ($datos[1]) : '';
        $tipoSangre              = !empty($datos[2])  ? ($datos[2]) : '';
        $alergias              = !empty($datos[3])  ? ($datos[3]) : '';
        $espacio               = !empty($datos[4])  ? ($datos[4]) : '';
        
        ?><script>
          alergias = "<?php echo $alergias ?>";
          nombre = "<?php echo $nombre ?>";
          telefono="<?php echo $telefono ?>";
          tipoSangre = "<?php echo $tipoSangre ?>";
          
           db = firebase.database();
           ruta =  db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child("BeeplayAlumnos").child(IdEscuela).child("Alumnos")
          data = {NombreAlumno : nombre, TelefonoEmergencia : telefono, TipoSangre : tipoSangre, Alergias: alergias};
          id= new Date().getTime();
          ruta.child(id).update(data);
        </script> <?php 
    }
    $i++;
}


  echo '<p style="text-aling:center; color:#333;">Total de Registros cargados: '. $cantidad_regist_agregados .'</p>';

?>

<a href="Alumnos.php">Atras</a>


