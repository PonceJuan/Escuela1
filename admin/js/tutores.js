import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA
let ruta;
let tab;
let idTutor;



$('#Filtrar').click(function() {
    //Tomar el id de Escuela
    let idEsc = $('#Escuelas').val();

    //Añadimos la terminacion de la RUTA
    ruta = rut2("BeeplayTutores",idEsc, "Tutores"); 


    
    //Configura los campos ocultos 
    let oculto = [0,4];

    //Crea los botones que se van a usar en esta lista
       //Crea los botones que se van a usar en esta lista
       //<button class='btnLista btn btn-success' data-toggle='tooltip' title='Mostrar Lista'>"+window.iconoVer+"</button> agregar despues para mostrar los hijos del tutor
    let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnVer btn btn-primary' data-toggle='tooltip' title='Editar Datos'>"+window.iconoEditar+"</button></div></div></div></div>"
    //Crea la DATA para enviar a TABLE
    let dataSet = [];

    $('#tablaMaster').dataTable().fnDestroy();

  
    //Llama al MODULO para crear TABLA
    tab = crearTABLA1(dataSet, botones,oculto); 

   

    //Agrega los DATOS a la tabla
    ruta.on("child_added", datos => { 
        dataSet = [datos.key, datos.child("NombreTutor").val(), datos.child("Email").val(), datos.child("Telefono").val(), datos.child("Foto").val()];
        tab.rows.add([dataSet]).draw();     
    });

   ruta.on('child_changed', datos => { 
        dataSet = [datos.key, datos.child("NombreTutor").val(), datos.child("Email").val(), datos.child("Telefono").val(), datos.child("Foto").val()];
        tab.row(filaEditada).data(dataSet).draw(); //Utiliza la variable GLOBAL filaEditada
      }) //DATOS Modificados

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
        document.getElementById("Foto").src = fila[4];

        $('#modalAltaEdicion').modal('show');
    
    });  
    
    $("#tablaMaster").on("click", ".btnLista", function() { 


        //Toma la posicion de fila editada   
        filaEditada = tab.row($(this).parents('tr')); 
        
        //Toma los datos de DATATABLE
        let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
        idTutor = fila[0]
       
        let dataSet2 = [];
            let botones2 = "<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Mostrar Lista'>"+window.iconoBorrar+"</button></div></div></div></div>"

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

        let ruta2= rut2("BeeplayHijosTutores", fila[0], "Hijos");

        ruta2.on("child_added", datos => { 
            dataSet2 = [datos.key, datos.child("NombreHijo").val()];
            table.rows.add([dataSet2]).draw();     
        });

            //---------Registro Eliminados
            ruta2.on("child_removed", function() {
            table.row(filaEliminada.parents('tr')).remove().draw();     //Utiliza la variable GLOBAL filaEliminada    
        
        
    });

        $('#modalLista').modal('show');
    
    });  

    $("#tablaMaster2").on("click", ".btnEliminar", function() {  
        filaEliminada = $(this); //Toma la possición de la fila ELiminada
        let fila2 = $('#tablaMaster2').dataTable().fnGetData($(this).closest('tr')); 

        Swal.fire({
            title: "¿Desea eliminar a "+fila2[1]+" ?",
            showCancelButton: true,
            confirmButtonText: "Eliminar"

          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let ruta3 = rut2("BeeplayHijosTutores", idTutor, "Hijos");

                ruta3.child(fila2[0]).remove();
              
            } 
          });



    });


    $('#btnGuardar').click(function() {

        
        let id = $('#id').val();
        let nombre = $('#Nombre').val();
        let foto = document.querySelector('#Foto2').files[0];
        let telefono = $('#Telefono').val();
        let data2;

        if (foto== undefined){ //No cargo Foto}
            data2={NombreTutor :nombre, Telefono: telefono}
            ruta.child(id).update(data2);

            Swal.fire({
                title: "Actualizado",
                text: "El registro a sido actualizado",
                icon: "success"
              });

              $('#modalAltaEdicion').modal('hide');
        }else{ //Subio
            let storageRef = firebase.storage().ref(); //Crear la referencia para STORAGE
   
            let name =new Date()+"-"+ foto.name;                              //Fecha + Nombre de la Foto
            const metadata = {
                contentType: foto.type
            }
            
            let task = storageRef.child(name).put(foto, metadata);
            task.
            then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                data2={Foto: url,NombreTutor :nombre, Telefono: telefono}
                ruta.child(id).update(data2);
                Swal.fire({
                    title: "Actualizado",
                    text: "El registro a sido actualizado",
                    icon: "success"
                  });

                  $('#modalAltaEdicion').modal('hide');
            }); 
        }

      

    });



});

