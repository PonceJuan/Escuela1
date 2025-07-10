import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA

//Añadimos la terminacion de la RUTA
let ruta = rut("BeeplayCodigosEscuelas"); 

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
    dataSet = [datos.key, datos.child("NombreEscuela").val(), datos.child("Codigo").val(), datos.child("Correo").val()];
    tab.rows.add([dataSet]).draw();     
});

//Modifica la tabla si existe un UPDATE
ruta.on('child_changed', datos => {   
    dataSet = [datos.key, datos.child("NombreEscuela").val(), datos.child("Codigo").val(), datos.child("Correo").val()];
    tab.row(filaEditada).data(dataSet).draw();
});

//Quita de la Tabla si existe un REMOVE
ruta.on("child_removed", function() {
   tab.row(filaEliminada.parents('tr')).remove().draw();                     
});

//Presionar BOTON GUARDA DATOS
$('#GuardarDatos').click(function(){
      //Las variables toma los DATOS de los INPUT
      let id = $.trim($('#id').val());        
      let nombre = $.trim($('#Nombre').val());
      let correo = $.trim($('#Correo').val());
      let clave = $.trim($('#Clave').val());
      let tipo = $('#Tipo').val();

      //Verifica los CAMPOS VACIOS
      if (nombre == ""  || correo == "" || clave == ""){
          Swal.fire({
              title: "Complete la información",
              text: "Existen campos si rellenar",
              icon: "error"
            });
      }else{

        //Crea el Autenticación
        firebase.auth().createUserWithEmailAndPassword(correo, clave)
        .then((userCredential) => {
            
            //Creamos el numero aleatorio de 6 digitos
            let numeroAleatorio = Math.random() * (999999 - 111111) + 111111;
            let redondeoNumero = Math.round(numeroAleatorio)
            let numero = String(redondeoNumero); //Transforma a String

            let data = {Codigo : numero , Correo : correo, NombreEscuela: nombre, idEscuela: userCredential.user.uid, idAplicacion : tipo}

            ruta.child(numero).update(data);
            
            let rutaCusto =  rutaCustom(tipo); 

            let rutaMember =  rutaCustom(tipo);

            let data2 = { TipoPerfil : "Admi"}

            let data3 = { name : nombre, email : correo};

            rutaCusto.child(userCredential.user.uid).child("customData").update(data2);

            rutaMember.child(userCredential.user.uid).update(data3);

            $('#modalAltaEdicion').modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Registro guardado',
                text: 'Se ha registrado con éxito',  
            }); 

            
        }).catch((error) => {  
            let errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,     
                       
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
        title: "¿Desea eliminar esta Bee Play Escuela?",
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

$("#tablaMaster").on("click", ".btnVer", function() { 

    //Toma la posicion de fila editada   
    filaEditada = tab.row($(this).parents('tr')); 
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr'));  
    let id = fila[0] 
    let datosBancarios = firebase.database().ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child("BancoEscuela").child(id)

    datosBancarios.on("value", datos => {
        $('#id2').val(id);
        $('#NombreEscuela').val(datos.child("NombreEscuela").val());
        $('#Beneficiario').val(datos.child("Beneficiario").val());
        $('#Banco').val(datos.child("Banco").val());
        $('#Clabe').val(datos.child("CLABE").val());
        $('#Comision').val(datos.child("Comision").val());
    });
             


    //Carga el Modal
    $('#modalDatosBancarios').modal('show');
});   





});

