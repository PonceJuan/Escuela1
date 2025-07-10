import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA 

$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    let idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    let ruta = rut2("BeeplayProfesores",idEsc, "Profesores"); 

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
        dataSet = [datos.key, datos.child("NombreProfesor").val(), datos.child("EmailProfesor").val()];
        tab.rows.add([dataSet]).draw();     
    });

});


$("#tablaMaster").on("click", ".btnVer", function() { 


    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    let id = fila[0];
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

    $('#modalEventos').modal('show');

    let ruta2= rut2("BeeplayTareaEnviadasProfesores", id, "TareasCurso");

    ruta2.on("child_added", datos => { 
        let fecha = moment.unix(datos.child("FechaEntrega").val()/1000).format('DD/MM/YYYY');
        let fecha2 = moment.unix(datos.child("FechaEnviada").val()/1000).format('DD/MM/YYYY');
        
        dataSet2 = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), fecha, fecha2];
        table.rows.add([dataSet2]).draw();     
    });

    
    
});   

});

