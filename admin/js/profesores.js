import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA
let ruta;               //Crea la extensión de Ruta
let tab;                //Tabla
let idEsc;


$('#Filtrar').click(function() {
    //Tomar el id de Escuela
     idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    ruta = rut2("BeeplayProfesores",idEsc, "Profesores"); 

    //Crea la DATA para enviar a TABLE
    let dataSet = [];
    
    //Configura los campos ocultos
    let oculto = [0,6];

    //Crea los botones que se van a usar en esta lista
    let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnVer btn btn-success' data-toggle='tooltip' title='Editar Datos'>"+window.iconoVer+"</button><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Editar Datos'>"+window.iconoBorrar+"</button></div></div></div></div>"

    $('#tablaMaster').dataTable().fnDestroy();
    //Llama al MODULO para crear TABLA
    tab = crearTABLA1(dataSet, botones,oculto); 

    //Agrega los DATOS a la tabla
    ruta.on("child_added", datos => { 
        dataSet = [datos.key, datos.child("NombreProfesor").val(), datos.child("EmailProfesor").val(), datos.child("TelefonoProfesor").val(), datos.child("BiografiaProfesor").val(), datos.child("Grupo").val(), datos.child("FotoProfesor").val()];
        tab.rows.add([dataSet]).draw();     
    });

    //Quita de la Tabla si existe un REMOVE
        ruta.on("child_removed", function() {
            tab.row(filaEliminada.parents('tr')).remove().draw();                     
        });

});


$("#tablaMaster").on("click", ".btnVer", function() { 

    //Toma la posicion de fila editada   
    filaEditada = tab.row($(this).parents('tr'));
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    $('#id').val(fila[0]);
    $('#Nombre').val(fila[1]);
    $('#Correo').val(fila[2]);
    $('#Telefono').val(fila[3]);
    $('#Biografia').val(fila[4]);
    $('#Grupo').val(fila[5]);
    
    document.getElementById("Foto").src = fila[6];

    $('#modalAltaEdicion').modal('show');

});  


$("#tablaMaster").on("click", ".btnEliminar", function() { 

    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
   
    Swal.fire({
        title: "¿Desear eliminar a"+fila[1]+" de esta lista?",
        showCancelButton: true,
        confirmButtonText: "Eliminar"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            ruta.child(fila[0]).remove();
          Swal.fire("Registro Eliminado!", "", "success");
        } 
      });
    
});  

              //Botones
    $('#btnNuevo').click(function() {

        if (idEsc == null){
            Swal.fire({
                title: "No se puede ejecutar",
                text: "Aun no ha filtrado alguna escuela",
                icon: "error"
              });
        }else{

            $('#id').val('');
            $('#Nombre').val('');
            $('#Correo').val('');
            $('#Biografia').val('');
            $('#Grupo').val('');
            $('#Foto').val('');
            $('#Telefono').val('');
            $('#modalAltaEdicion').modal('show');
    
        }

    });


    $('#btnGuardar').click(function() {

       let id =  $('#id').val();
       let nombre= $('#Nombre').val();
       let correo= $('#Correo').val();
       let telefono= $('#Telefono').val();
       let biografia = $('#Biografia').val();
       let grupo = $('#Grupo').val();

       if (id== ""){
        id = new Date().getTime();
       }

       let data2 = {BiografiaProfesor : biografia, EmailProfesor : correo,Grupo : grupo, NombreProfesor: nombre, TelefonoProfesor : telefono, idProfesor: id }

       ruta.child(id).update(data2);

       Swal.fire({
        title: "Excelente",
        text: "Registro creado",
        icon: "success"
      });

      $('#modalAltaEdicion').modal('hide')
       

    });
              

});

