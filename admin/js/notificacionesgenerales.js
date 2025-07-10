import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA 
let idEsc;

$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    let ruta = rut2("BeeplayAlumnos",idEsc, "Alumnos"); 

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
        dataSet = [datos.key, datos.child("NombreAlumno").val(), datos.child("NombreMaestra").val()];
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

    let ruta2= rut2("BeeplayNotificacionesGenerales", id, "Notificaciones");

    ruta2.on("child_added", datos => { 
        let fecha = moment.unix(datos.child("UltimaActualizacionDiario").val()/1000).format('DD/MM/YYYY');
        dataSet2 = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), datos.child("FechaNotificacion").val(), datos.child("Leido").val(), fecha];
        table.rows.add([dataSet2]).draw();     
    });
    
});  

$('#NuevoNotificacion').click(function() {

    if (idEsc !=  undefined){
        $('#modalNotificacion').modal('show');
    }else{
        Swal.fire("Debe filtrar una escuela!");
    }
    
});

$('#EnviarNotificacion').click(function() {
    let mensaje = $('#Nombre3').val();
    if (mensaje == ""){
        Swal.fire("Debe ingresar un texto!");
    } else{ //llama al WEEBKHOOK

        $.ajax({
            method: "POST",
            url: "notificacion.php",
            data: { Nombre: mensaje, idEsuela : idEsc  }
          })
            .done(function( response ) {
              $("p.broken").html(response);
            });
          
          $('#modalNotificacion').modal('show');
          Swal.fire("Notifación enviada!");

    }
    
});



});

