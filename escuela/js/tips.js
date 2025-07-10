import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA

//Añadimos la terminacion de la RUTA
let ruta = rut("BeeplayTips"); 

//Crea la DATA para enviar a TABLE
let dataSet = [];
 
//Configura los campos ocultos
let oculto = [0,4];

//Crea los botones que se van a usar en esta lista
let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Editar Datos'>"+window.iconoBorrar+"</button></div></div></div></div>"

//Llama al MODULO para crear TABLA
let tab = crearTABLA1(dataSet, botones,oculto); 

//Agrega los DATOS a la tabla
ruta.on("child_added", datos => { 
    dataSet = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), datos.child("Tipo").val(), datos.child("FotoTip").val()];
    tab.rows.add([dataSet]).draw();     
});

//Modifica la tabla si existe un UPDATE
ruta.on('child_changed', datos => {   
    dataSet = [datos.key, datos.child("Titulo").val(), datos.child("Descripcion").val(), datos.child("Tipo").val(), datos.child("FotoTip").val()];
    tab.row(filaEditada).data(dataSet).draw();
});

//Quita de la Tabla si existe un REMOVE
ruta.on("child_removed", function() {
   tab.row(filaEliminada.parents('tr')).remove().draw();                     
});

//Presionar BOTON GUARDA DATOS
$('#GuardarDatos').click(function(){
      //Las variables toma los DATOS de los INPUT   
      let titulo = $.trim($('#Titulo').val());
      let descripcion = $.trim($('#Descripcion').val());
      let tipo = $.trim($('#Tipo').val());
      let foto = document.querySelector('#Foto').files[0];

      //Verifica los CAMPOS VACIOS
      if (titulo == ""  || descripcion == "" || tipo == "" || foto == undefined){
          Swal.fire({
              title: "Complete la información",
              text: "Existen campos sin rellenar",
              icon: "error"
            });
      }else{

        let storageRef = firebase.storage().ref(); //Crear la referencia para STORAGE
   
        let name =new Date()+"-"+ foto.name;                              //Fecha + Nombre de la Foto
        const metadata = {
            contentType: foto.type
        }
        
        let task = storageRef.child(name).put(foto, metadata);
        task.
        then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let data = {Titulo : titulo, Descripcion : descripcion, Tipo :tipo, FotoTip : url}
            let timestamp = new Date().getTime();
            let idgenerado = String(timestamp);
            ruta.child(idgenerado).update(data);
    
                $('#modalAltaEdicion').modal('hide');
    
                Swal.fire({
                    icon: 'success',
                    title: 'Registro guardado',
                    text: 'Se ha registrado con éxito',  
                }); 
        
        }); 
        
      }
});


//Botones
$('#btnNuevo').click(function() {

    $('#id').val('');        
    $('#Nombre').val('');
    $('#Correo').val('');
    $('#Clave').val('');

    //Llama al MODAL
    $('#modalAltaEdicion').modal('show');
});  

$("#tablaMaster").on("click", ".btnEliminar", function() { 

    //Toma la posicion de fila editada   
    filaEliminada = $(this); //Toma la possición de la fila ELiminada
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    
    Swal.fire({
        title: "¿Desea eliminar este tip?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          ruta.child(fila[0]).remove();

          Swal.fire({
            title: "Eliminado",
            text: "El tips a sido eliminada con éxito",
            icon: "success"
          });

        } 
      });
 
});   

});

