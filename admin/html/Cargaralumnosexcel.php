<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
use Kreait\Firebase\Factory;

function GuardarDatosAlumnos($database, $idEsc, $alumnoData, $idAlu) {
    // Ruta en Firebase
    $ruta = "BeeplayAlumnos/{$idEsc}/Alumnos/{$idAlu}";

    // Subir los datos a Firebase
    $database->getReference($ruta)->update($alumnoData);
}

// Configurar Firebase
$firebase = (new Factory)
    ->withServiceAccount('path/to/your-firebase-credentials.json') // Reemplaza con la ruta a tu archivo de credenciales de Firebase
    ->withDatabaseUri('https://your-database-url.firebaseio.com/') // Reemplaza con la URL de tu base de datos
    ->create();

$database = $firebase->getDatabase();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['excelFile']) && isset($_POST['schoolId'])) {
    $file = $_FILES['excelFile']['tmp_name'];
    $idEsc = $_POST['schoolId'];

    if (empty($file) || empty($idEsc)) {
        echo "Error: Archivo Excel o ID de escuela no proporcionado.";
        exit;
    }

    try {
        // Detectar el tipo de archivo y cargarlo correctamente
        $fileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($file);
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($fileType);
        $spreadsheet = $reader->load($file);

        $worksheet = $spreadsheet->getActiveSheet();
        $rows = $worksheet->toArray(null, true, true, true); // Parámetros para preservar nulos y manejar tipos de datos

        foreach ($rows as $index => $row) {
            if ($index === 1) continue; // Saltar la primera fila si es un encabezado

            // Utilizar las letras de columnas (A, B, C, etc.) para identificar los campos
            $nombreAlumno = $row['A'] ?? '';
            $alergias = $row['B'] ?? '';
            $tipoSangre = $row['C'] ?? '';
            $nombreMaestra = $row['D'] ?? '';
            $nombreTutor1 = $row['E'] ?? '';
            $nombreTutor2 = $row['F'] ?? '';
            $telefonoEmergencia = $row['G'] ?? '';
            $fotoAlumno = $row['H'] ?? '';
            $idMaestra = $row['I'] ?? '';
            $idTutor1 = $row['J'] ?? '';
            $idTutor2 = $row['K'] ?? '';

            // Validar que los datos mínimos requeridos estén presentes
            if (empty($nombreAlumno) || empty($idMaestra) || empty($idTutor1)) {
                echo "Advertencia: Datos incompletos en la fila $index. Fila omitida.<br>";
                continue; // Saltar esta fila
            }

            $alumnoData = [
                'Alergias' => $alergias,
                'FotoAlumno' => $fotoAlumno,
                'NombreAlumno' => $nombreAlumno,
                'NombreMaestra' => $nombreMaestra,
                'NombreTutor1' => $nombreTutor1,
                'NombreTutor2' => $nombreTutor2,
                'TelefonoEmergencia' => $telefonoEmergencia,
                'TipoSangre' => $tipoSangre,
                'idMaestra' => $idMaestra,
                'idTutor1' => $idTutor1,
                'idTutor2' => $idTutor2
            ];

            $idAlu = "alumno_" . ($index); // Generar un ID único para cada alumno

            // Guardar los datos en Firebase
            GuardarDatosAlumnos($database, $idEsc, $alumnoData, $idAlu);
        }

        echo "Datos subidos exitosamente a Firebase.";

    } catch (Exception $e) {
        echo "Error al procesar el archivo: " . $e->getMessage();
    }
} else {
    echo "Error: Solicitud inválida o datos faltantes.";
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cargar Excel</title>
</head>
<body>
    <form action="cargar_excel.php" method="post" enctype="multipart/form-data">
        <!-- Picker para seleccionar la escuela -->
        <select name="schoolId" required>
            <option value="">Seleccione una escuela</option>
            <option value="schoolId_1">Escuela 1</option>
            <option value="schoolId_2">Escuela 2</option>
            <!-- Agrega más opciones según sea necesario -->
        </select>

        <!-- Input para cargar el archivo -->
        <input type="file" name="excelFile" accept=".xlsx, .xls" required />

        <!-- Botón para enviar el formulario -->
        <button type="submit">Cargar y Subir a Firebase</button>
    </form>
</body>
</html>
