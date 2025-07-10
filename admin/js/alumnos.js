import {crearTABLA1} from "../../js/table.js"; //Importa el MODULO que crea la TABLA

$(document).ready(function() {
    $('#contenedorSubir').hide();

let filaEliminada;      //Captura la fila ELIMINADA
let filaEditada;        //Captura la fila MODIFICADA
let dataSet;
let ruta;
let idEsc;      //Toma el ID de la Escuela
let tab;

let generalIdTutor1="";
let generalIdTutor2="";
let generalFoto="";
let generalNombre="";
let generalIdMaestra="";
$('#Escuelas').change(function () {
    idEsc = $(this).val();
    $('#contenedorSubir').show();
    sessionStorage.setItem("idEscuela", idEsc);
    
    ruta = rut2("BeeplayAlumnos", idEsc, "Alumnos");

    // 🧼 Destruye tabla principal si ya existe
    if ( $.fn.DataTable.isDataTable('#tablaMaster') ) {
        $('#tablaMaster').DataTable().clear().destroy();
    }

    dataSet = [];
    let oculto = [0,7,9,10,11];
    let botones = "<div class='wrapper text-center'><div class='btn-group'><button class='btnVer btn btn-success' data-toggle='tooltip' title='Editar Datos'>"+window.iconoVer+"</button><button class='btnEliminar btn btn-danger' data-toggle='tooltip' title='Editar Datos'>"+window.iconoBorrar+"</button><button class='btnQr btn btn-success' data-toggle='tooltip' title='Editar Datos'>"+window.iconoClave+"</button></div></div>";

    tab = crearTABLA1(dataSet, botones, oculto);
tab.clear().draw(); // Limpia todo antes de comenzar a llenar

ruta.once("value", snapshot => {
    snapshot.forEach(datos => {
        let dataSet = [
            datos.key,
            datos.child("NombreAlumno").val(),
            datos.child("NombreMaestra").val(),
            datos.child("NombreTutor1").val(),
            datos.child("NombreTutor2").val(),
            datos.child("TelefonoEmergencia").val(),
            datos.child("TipoSangre").val(),
            datos.child("FotoAlumno").val(),
            datos.child("Alergias").val(),
            datos.child("idMaestra").val(),
            datos.child("idTutor1").val(),
            datos.child("idTutor2").val()
        ];
        tab.rows.add([dataSet]);
    });
    tab.draw(); // Dibuja una sola vez al final
});
    ruta.on('child_changed', datos => {
        dataSet = [
            datos.key,
            datos.child("NombreAlumno").val(),
            datos.child("NombreMaestra").val(),
            datos.child("NombreTutor1").val(),
            datos.child("NombreTutor2").val(),
            datos.child("TelefonoEmergencia").val(),
            datos.child("TipoSangre").val(),
            datos.child("FotoAlumno").val(),
            datos.child("Alergias").val(),
            datos.child("idMaestra").val(),
            datos.child("idTutor1").val(),
            datos.child("idTutor2").val()
        ];
        tab.row(filaEditada).data(dataSet).draw();
    });

    ruta.on("child_removed", function () {
        tab.row(filaEliminada.parents('tr')).remove().draw();
    });

    // 🔄 Cargar profesores
    $('#Profesores option').remove();
    let escuelaPicker = rut2("BeeplayProfesores", idEsc, "Profesores"); 
    escuelaPicker.orderByChild("NombreProfesor").on("child_added", datos => {
        let cargarEscuela = '<option value=' + datos.key + '>' + datos.child("NombreProfesor").val() + '</option>';
        document.getElementById("Profesores").insertAdjacentHTML("beforeend", cargarEscuela);
    });

    // 🔄 Cargar tutores tablaMaster2
    if ( $.fn.DataTable.isDataTable('#tablaMaster2') ) {
        $('#tablaMaster2').DataTable().clear().destroy();
    }

    let tablaTutor1 = $('#tablaMaster2').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: [],
        columnDefs: [
            { targets: [0], visible: false },
            { targets: -1, defaultContent: "<div class='btn-group'><button class='btnAceptar btn btn-success'>" + window.iconoClave + "</button></div>" }
        ]
    });

    let escuelaPicker2 = rut2("BeeplayTutores", idEsc, "Tutores"); 
    escuelaPicker2.orderByChild("NombreTutor").on("child_added", datos => {
        let dataSet = [datos.key, datos.child("NombreTutor").val()];
        tablaTutor1.rows.add([dataSet]).draw();
    });

    // 🔄 Cargar tutores tablaMaster3
    if ( $.fn.DataTable.isDataTable('#tablaMaster3') ) {
        $('#tablaMaster3').DataTable().clear().destroy();
    }

    let tablaTutor2 = $('#tablaMaster3').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: [],
        columnDefs: [
            { targets: [0], visible: false },
            { targets: -1, defaultContent: "<div class='btn-group'><button class='btnAceptar2 btn btn-success'>" + window.iconoClave + "</button></div>" }
        ]
    });

    let escuelaPicker3 = rut2("BeeplayTutores", idEsc, "Tutores"); 
    escuelaPicker3.orderByChild("NombreTutor").on("child_added", datos => {
        let dataSet = [datos.key, datos.child("NombreTutor").val()];
        tablaTutor2.rows.add([dataSet]).draw();
    });

});



$('#btnAgregarMaestro').click(function() {
    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{
        $('#modalMaestro').modal('show');
    }
  
});

$('#btnAgregarTutor1').click(function() {
    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{

        $('#modalTutor1').modal('show');
    }
  
});

$('#btnAgregarTutor2').click(function() {
    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{
        $('#modalTutor2').modal('show');
    }
  
});


$('#btnGuardarMestros').click(function() {

    let idAlumno = $('#id').val();
    let nombreMaestro = $('select[id=Profesores] option:selected').text(); 
    let idMaestro = $('#Profesores').val();

    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{

       //Compara si es distintos para eliminar el otro registro
       if (generalIdMaestra != idMaestro && generalIdMaestra != ""  ){
        if (generalIdMaestra != null){
            EliminarAlumnosProfesores(generalIdMaestra, idAlumno);
        }
           
       }
       generalIdMaestra = idMaestro; //General Maestra toma el nuevo ID.
       $('#Maestra').val(nombreMaestro); //Pone el NOmbre del Maestro

       //Guarda el ALUMNOS - PROFESOR
       GuardarAlumnosProfesores(idMaestro, idAlumno, generalFoto, generalNombre, generalIdTutor1, generalIdTutor2);
       //Guarda en ALUMNOS
       GuardarDatosAlumnos();

       $('#modalMaestro').modal('hide');

    }
  
});

$('#btnGuardarTutores1').click(function() {

    let idAlumno = $('#id').val();
    let nombreTutor = $('select[id=Tutores1] option:selected').text(); 
    let idTutor1 = $('#Tutores1').val();

    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{
        if (generalIdTutor1 != idTutor1 && generalIdTutor1 != "" || generalIdTutor1 != null){
            EliminarHijosTurores(generalIdTutor1, idAlumno); //Llama a la función de eliminar antiguo tutor
        }

        generalIdTutor1 = idTutor1; //Pone el nuevo Id de tutor
        $('#Tutor1').val(nombreTutor); //Pone el NOmbre del Maestro

        //Guarda el TUTORES - ALUMNOS
        GuardarHijoTutores(idTutor1, idAlumno) //Realiza el Registro del Tutor

       //Guarda en ALUMNOS
       GuardarDatosAlumnos();

       $('#modalTutor1').modal('hide');

    }
  
});

$('#btnGuardarTutores2').click(function() {

    let idAlumno = $('#id').val();
    let nombreTutor = $('select[id=Tutores2] option:selected').text(); 
    let idTutor2 = $('#Tutores2').val();

    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
          
    }else{

        if (generalIdTutor2 != idTutor2 && generalIdTutor2 != "" || generalIdTutor2 !=null){
            EliminarHijosTurores(generalIdTutor2, idAlumno); //Llama a la función de eliminar antiguo tutor
        }

        generalIdTutor2 = idTutor2; //Pone el nuevo Id de tutor
        $('#Tutor2').val(nombreTutor); //Pone el NOmbre del Maestro

        //Guarda el TUTORES - ALUMNOS
        GuardarHijoTutores(idTutor2, idAlumno) //Realiza el Registro del Tutor

       //Guarda en ALUMNOS
       GuardarDatosAlumnos();


       $('#modalTutor2').modal('hide');

    }
  
});


$('#btnNuevo').click(function() {

    if (idEsc == null){
        Swal.fire({
            title: "Error",
            text: "Debes filtrar una escuela",
            icon: "error"
          });
    }else{
        $('#Foto').hide();
        $('#id').val('');
        $('#Nombre').val('');
        $('#Maestra').val('');
        $('#Tutor1').val('');
        $('#Tutor2').val('');
        $('#Telefono').val('');
        $('#TipoSangre').val('');
        $('#Alergias').val('');
        $('#modalAltaEdicion').modal('show');
    }

   
});

$('#btnGuardar').click(function() {

    let id = $('#id').val();
    let foto = document.querySelector('#Imagen').files[0]; //Lectura de INPUT FILE

    if (id == ""){
        id = new Date().getTime() //Pone nuevo Numero
        $('#id').val(id);
    }

    if (foto == undefined){
        GuardarDatosAlumnos() //Llamo a la funcion Guardar Alumnos
    
        $('#modalAltaEdicion').modal('hide');
    
        Swal.fire({
            title: "Exito",
            text: "El registro a sido creado",
            icon: "success"
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
           generalFoto = url; //Pone el nuevo valor a la Foto
           GuardarDatosAlumnos() //Llamo a la funcion Guardar Alumnos

        
            $('#modalAltaEdicion').modal('hide');
        
            Swal.fire({
                title: "Exito",
                text: "El registro a sido creado",
                icon: "success"
              });
        
        }); 
    }
});



$("#tablaMaster").on("click", ".btnQr", function() { 

  
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    $('#id').val(fila[0]);
    $('#Nombre').val(fila[1]);
    let ruta = "codigoqr.php?id="+fila[0]+"&nombre="+fila[1]+""
    window.open(ruta);
});  

$("#tablaMaster2").on("click", ".btnAceptar", function() { 
    let fila = $('#tablaMaster2').dataTable().fnGetData($(this).closest('tr')); 

    let idAlumno = $('#id').val();
    let nombreTutor = fila[1]; 
    let idTutor1 = fila[0];

    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{
        if (generalIdTutor1 != idTutor1 && generalIdTutor1 != ""){

            if (generalIdTutor1 != null){
                EliminarHijosTurores(generalIdTutor1, idAlumno); //Llama a la función de eliminar antiguo tutor
            }
  
        }

        generalIdTutor1 = idTutor1; //Pone el nuevo Id de tutor
        $('#Tutor1').val(nombreTutor); //Pone el NOmbre del Maestro

        //Guarda el TUTORES - ALUMNOS
        GuardarHijoTutores(idTutor1, idAlumno) //Realiza el Registro del Tutor

       //Guarda en ALUMNOS
       GuardarDatosAlumnos();

       $('#modalTutor1').modal('hide');

    }
  
});

$("#tablaMaster3").on("click", ".btnAceptar2", function() { 
    let fila = $('#tablaMaster3').dataTable().fnGetData($(this).closest('tr')); 

    let idAlumno = $('#id').val();
    let nombreTutor = fila[1]; 
    let idTutor2 = fila[0];

    if ($('#id').val() == ""){
        Swal.fire({
            title: "Error",
            text: "Debes crear primero el alumno para poder agregar",
            icon: "error"
          });
    }else{
        if (generalIdTutor2 != idTutor2 && generalIdTutor2 != ""){
            if (generalIdTutor2 != null){
                EliminarHijosTurores(generalIdTutor2, idAlumno); //Llama a la función de eliminar antiguo tutor
            }
        }

        generalIdTutor1 = idTutor2; //Pone el nuevo Id de tutor
        $('#Tutor2').val(nombreTutor); //Pone el NOmbre del Maestro

        //Guarda el TUTORES - ALUMNOS
        GuardarHijoTutores(idTutor2, idAlumno) //Realiza el Registro del Tutor

       //Guarda en ALUMNOS
       GuardarDatosAlumnos();

       $('#modalTutor2').modal('hide');

    }
  
});



$("#tablaMaster").on("click", ".btnVer", function() { 

    //Toma la posicion de fila editada   
    filaEditada = tab.row($(this).parents('tr')); 
    
    //Toma los datos de DATATABLE
    let fila = $('#tablaMaster').dataTable().fnGetData($(this).closest('tr')); 
    $('#id').val(fila[0]);
    $('#Nombre').val(fila[1]);
    $('#Maestra').val(fila[2]);
    $('#Tutor1').val(fila[3]);
    $('#Tutor2').val(fila[4]);
    $('#Telefono').val(fila[5]);
    $('#TipoSangre').val(fila[6]);
    if (fila[7] == null ){
        $('#Foto').hide();
    }else{
        $('#Foto').show();
        document.getElementById("Foto").src = fila[7];
    }
    $('#Alergias').val(fila[8]);

    generalNombre = fila[1];
    generalFoto = fila[7];
    generalIdMaestra = fila[9]
    generalIdTutor1 = fila[10];
    generalIdTutor2 = fila[11];

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

        //Realiza la eliminación de Tutores y Maestros
          EliminarAlumnosProfesores(fila[9],fila[0])
          EliminarHijosTurores(fila[10],fila[0]);
          EliminarHijosTurores(fila[11],fila[0]);
        } 
      });

});   

function GuardarAlumnosProfesores(idProfesor, idAlumno, Foto, Nombre){


    let ruta = rut2("BeeplayAlumnosProfesores",idProfesor,"Alumnos");
    let data = {FotoAlumno : Foto, NombreAlumno : Nombre, idAlumno : idAlumno, idTutor1 : generalIdTutor1, idTutor2 : generalIdTutor2};
    ruta.child(idAlumno).update(data);

};

function EliminarAlumnosProfesores(idProfesor, idAlumno){

    //Elimina de la Coleccion del profesor el alumno

    console.log(idProfesor+"  "+idAlumno);

    let ruta = rut2("BeeplayAlumnosProfesores",idProfesor,"Alumnos");
    ruta.child(idAlumno).remove();

};

function GuardarHijoTutores(idTutor, idAlumno){

    console.log(idTutor);
    console.log(idAlumno);

    let ruta = rut2("BeeplayHijosTutores",idTutor,"Hijos");
    let data = {FotoHijo :generalFoto, NombreHijo: $('#Nombre').val(), idEscuela: idEsc, idMaestra : generalIdMaestra};
     ruta.child(idAlumno).update(data);

};

function EliminarHijosTurores(idTutor , idAlumno){

    //Elimina de la Coleccion de tutor el Alumno

    let ruta = rut2("BeeplayHijosTutores", idTutor, "Hijos");
    ruta.child(idAlumno).remove();

}

function GuardarDatosAlumnos(){
    
    let ruta = rut2("BeeplayAlumnos",idEsc, "Alumnos");
    let data = {Alergias: $('#Alergias').val(), FotoAlumno : generalFoto, NombreAlumno: $('#Nombre').val(), NombreMaestra: $('#Maestra').val(), NombreTutor1: $('#Tutor1').val(), NombreTutor2: $('#Tutor2').val(), TelefonoEmergencia: $('#Telefono').val(), TipoSangre :  $('#TipoSangre').val(), idMaestra : generalIdMaestra, idTutor1: generalIdTutor1, idTutor2: generalIdTutor2 }
    let idAlu = $('#id').val();
    ruta.child(idAlu).update(data);
}


});



