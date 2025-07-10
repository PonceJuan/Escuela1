import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA 
let ruta;
let idEsc;     
//hola

$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    ruta = rut2("BeeplayProfesores",idEsc, "Profesores"); 

    //Crea la DATA para enviar a TABLE
    let dataSet = [];
    
    //Configura los campos ocultos
    let oculto = [0,3];

    //Crea los botones que se van a usar en esta lista
    let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnVer btn btn-success' data-toggle='tooltip' title='Editar Datos'>"+window.iconoVer+"</button></div></div></div></div>"

    $('#tablaMaster').dataTable().fnDestroy();
    //Llama al MODULO para crear TABLA
    let tab = crearTABLA1(dataSet, botones,oculto); 

    //Agrega los DATOS a la tabla
    ruta.on("child_added", datos => { 
        dataSet = [datos.key, datos.child("NombreProfesor").val(), datos.child("EmailProfesor").val(), datos.child("FotoProfesor").val()];
        tab.rows.add([dataSet]).draw();     
    });

});


$("#tablaMaster").on("click", ".btnVer", function() { 


    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    let id = fila[0];
    document.getElementById("Foto").src = fila[3];
    let dataSet2 = [];

    //Crea Botones
     let botones2 = "<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Eliminar Datos Datos'>"+window.iconoBorrar+"</button></div></div></div></div>"
  

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

    let ruta2= rut2("BeeplayAlumnosProfesores", id, "Alumnos");

    ruta2.on("child_added", datos => { 
        let fecha = moment.unix(datos.child("UltimaActualizacionDiario").val()/1000).format('DD/MM/YYYY');

        dataSet2 = [datos.key, datos.child("NombreAlumno").val(), fecha, datos.child("UltimaDescripcionDiario").val()];
        table.rows.add([dataSet2]).draw();     
    });

    
    ruta2.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();     //Utiliza la variable GLOBAL filaEliminada    
    });


    $("#tablaMaster2").on("click", ".btnEliminar", function() {
        
        filaEliminada = $(this); //Toma la possición de la fila ELiminada
       
        let fila2 = $('#tablaMaster2').dataTable().fnGetData($(this).closest('tr')); 

        Swal.fire({
            title: "¿Desea eliminar a"+fila[1]+ "?",
          
            showCancelButton: true,
            confirmButtonText: "Eliminar"
           
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                ruta.child(fila[0]).remove(); //Elimina de Lista Oficial

                 //Añadimos la terminacion de la RUTA
                let ruta2 = rut2("BeeplayAlumnos",idEsc, "Alumnos"); 

                let data2 = {NombreMaestra: false, idMaestra : false} //Crea la Data

                ruta2.child(fila2[0]).update(data2); //Actualiza en la Otra Lista

              Swal.fire("Eliminado!", "", "success");
            } 
          });


    });
   

    
    
});   

});

