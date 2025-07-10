
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código QR</title>
</head>
<body>
    <img id="qr" src="" width="300px" heigth="300px" alt="">

    <h2 id="nombre">Josue Aaron Zorrilla Carreño</h2>
</body>
</html>

<script>

let uid = "<?php echo $_GET['id']; ?>"
uid = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data="+uid
let nombre = "<?php echo $_GET['nombre']; ?>"

document.getElementById("nombre").innerHTML = nombre;
document.getElementById("qr").src = uid;

</script>