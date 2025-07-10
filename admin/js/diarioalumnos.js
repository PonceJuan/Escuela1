import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA
let id2; 

$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    let idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    let ruta = rut2("BeeplayAlumnos",idEsc, "Alumnos"); 

    //Crea la DATA para enviar a TABLE
    let dataSet = [];
    
    //Configura los campos ocultos
    let oculto = [];

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
    id2 = fila[0];
    let dataSet2 = [];
        //Crea los botones que se van a usar en esta lista
    let botones2 = "<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Editar Datos'>"+window.iconoBorrar+"</button></div></div></div></div>"

    $('#tablaMaster2').dataTable().fnDestroy();
    var table = $('#tablaMaster2').DataTable({
        pageLength : 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet2,
        columnDefs: [
            {
                targets: [0], 
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,        
                defaultContent:botones2
            }
        ]	   
    });

    $('#modalEventos').modal('show');

    let ruta2= rut2("BeeplayDiarioAlumnos", id, "Registros");

    ruta2.on("child_added", datos => { 
        let fecha = moment.unix(datos.child("FechaRegistro").val()/1000).format('YYYY/MM/DD');
        dataSet2 = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), fecha];
        table.rows.add([dataSet2]).draw();     
    });

        //---------Registro Eliminados
        ruta2.on("child_removed", function() {
            table.row(filaEliminada.parents('tr')).remove().draw();     //Utiliza la variable GLOBAL filaEliminada    
        });
    
});   

//Funcionalidad de un boton dentro de una lista
$("#tablaMaster2").on("click", ".btnEliminar", function() {

    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    let fila2 = $('#tablaMaster2').dataTable().fnGetData($(this).closest('tr'));  
    
    Swal.fire({
        title: "¿Desea eliminar este diario?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
       
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        let ruta3= rut2("BeeplayDiarioAlumnos", id2, "Registros");

        ruta3.child(fila2[0]).remove() //Elimina
          Swal.fire("Eliminado!", "", "success");
        }
      });
    

});

});

