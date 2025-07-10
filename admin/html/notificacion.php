<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['Nombre'];
    $idEscuela = $_POST['idEscuela'];

    $data = [
        'NombreEvento' => $nombre,
        'idEscuela' => $idEscuela
    ];

    $url = 'https://us-central1-school-abc60.cloudfunctions.net/appProcessWebHook/ccp_jMF5krYv8ApUPL5tKbfvvi';
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
        ],
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        die('Error al enviar los datos.');
    }

    echo 'Datos enviados con éxito: ' . $result;
}
?>