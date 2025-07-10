import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA

$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    let idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    let ruta = rut2("BeeplayCodigosSalida",idEsc, "Codigos"); 

    //Crea la DATA para enviar a TABLE
    let dataSet = [];
    
    //Configura los campos ocultos
    let oculto = [0];

    //Crea los botones que se van a usar en esta lista
    let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnVer btn btn-success' data-toggle='tooltip' title='Editar Datos'>"+window.iconoVer+"</button></div></div></div></div>"
    $('#tablaMaster').dataTable().fnDestroy();

    //Llama al MODULO para crear TABLA
    let tab = crearTABLA1(dataSet, botones,oculto); 

    //Agrega los DATOS a la tabla
    ruta.on("child_added", datos => { 
        let fecha = moment.unix(datos.child("FechaGenerado").val()/1000).format('DD/MM/YYYY HH:mm');
        dataSet = [datos.key, datos.child("NombreAlumno").val(), datos.child("NombreResponsable").val(), datos.child("Parentesco").val(), datos.child("TutorPermiso").val(), fecha];
        tab.rows.add([dataSet]).draw();     
    });

});


$("#tablaMaster").on("click", ".btnVer", function() { 


    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
   
    $('#Nombre').val(fila[1]);
    $('#Maestra').val(fila[2]);
    $('#Tutor1').val(fila[3]);
    $('#Tutor2').val(fila[4]);
    $('#Telefono').val(fila[5]);
    $('#TipoSangre').val(fila[6]);
    document.getElementById("Foto").src = fila[7];
    $('#Alergias').val(fila[8]);
    $('#modalAltaEdicion').modal('show');



    
    
});   

});

