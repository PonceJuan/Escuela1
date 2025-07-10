import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA

//Añadimos la terminacion de la RUTA
let ruta = rut("BeeplayAyudaGeneral"); 

//Crea la DATA para enviar a TABLE
let dataSet = [];
 
//Configura los campos ocultos
let oculto = [0];

//Crea los botones que se van a usar en esta lista
let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Editar Datos'>"+window.iconoBorrar+"</button></div></div></div></div>"

//Llama al MODULO para crear TABLA
let tab = crearTABLA1(dataSet, botones,oculto); 

//Agrega los DATOS a la tabla
ruta.on("child_added", datos => { 
  let fecha = moment.unix(datos.child("FechaSolicitud").val()/1000).format('DD/MM/YYYY');
    dataSet = [datos.key, datos.child("NombreUsuario").val(), datos.child("Descripcion").val(), fecha, datos.child("TipoAyuda").val(), datos.child("Telefono").val()];
    tab.rows.add([dataSet]).draw();     
});



//Quita de la Tabla si existe un REMOVE
ruta.on("child_removed", function() {
   tab.row(filaEliminada.parents('tr')).remove().draw();                     
});




 

$("#tablaMaster").on("click", ".btnEliminar", function() { 


    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    
    
    Swal.fire({
        title: "¿Desea eliminar esta Ayuda General?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          ruta.child(fila[0]).remove();

          Swal.fire({
            title: "Eliminada",
            text: "La escuela a sido eliminada con éxito",
            icon: "success"
          });

        } 
      });
 
});   

});

