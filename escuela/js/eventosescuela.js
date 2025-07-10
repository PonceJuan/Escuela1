import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let id = sessionStorage.getItem("IdEscuela");

let dataSet2 = [];

$('#tablaMaster2').dataTable().fnDestroy();
var table = $('#tablaMaster2').DataTable({
    pageLength : 5,
    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
    data: dataSet2,
    columnDefs: [
        {
            targets: [0], 
            visible: false, //ocultamos la columna de ID que es la [0]                        
        }
    ]	   
});

let ruta2= rut2("BeeplayEventosEscuela", id, "Eventos");

ruta2.on("child_added", datos => { 
    let fecha = moment.unix(datos.child("FechaGenerado").val()/1000).format('DD/MM/YYYY');
    dataSet2 = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), datos.child("FechaEvento").val(), fecha];
    table.rows.add([dataSet2]).draw();     
});

});

