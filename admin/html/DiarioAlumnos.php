<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Diario Alumnos</h3>                            
                </div>
                
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header">



          <!--MODAL 2-->
          <div class="modal fade" id="modalEventos" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document" style="max-width: 90%; height: 90%;">
        <div class="modal-content" style="height: 100%;">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel33">Diario Alumnos</h4>
            </div>
            
            <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
            
            <div class="modal-body" style="overflow-y: auto; height: calc(100% - 56px);">
                <table class='table table-striped' id="tablaMaster2" style="width: 100%; table-layout: fixed;">
                    <thead>
                        <tr>
                            <th style="width: 10%;">ID</th>
                            <th style="width: 15%;">Titulo</th>
                            <th style="width: 60%;">Descripción</th>
                            <th style="width: 5%;">Fecha</th>
                            <th style="width: 10%;">Acciones</th>
                        </tr>
                    </thead>              
                    <tbody>
                        <!-- Aquí irán las filas de la tabla -->
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
</div>


                <!--FIN DE MODAL  2-->


                <select id="Escuelas" class="form-control" >
                   
                </select>
                <br>
                <button type="submit" id="Filtrar"  class="btn btn-primary" translate="1">Filtrar</button>
                 
             </div>

                <div class="card-body">                          

                    <table class='table table-striped' id="tablaMaster">
                        <thead>
                             <th>Id</th>
                                <th>Nombre</th>
                                <th>Maestra</th>
                                <th>Acciones</th>                                       
                            </tr>
                        </thead>
                        <tbody>                                    
                        </tbody>                                
                    </table>
                </div>
            </div>
        </section>
    </div>
    </div>
  </div>




<!--Importa el FOOTER (Script necesarios)-->
<?php require('Footer.php') ?>  

<!--Importa el SCRIPT de ESCUELAS-->
<script src="../js/diarioalumnos.js" type="module"></script>

<!--Importa la GUARDAR FOTOS-->
<script src="../../js/savephoto.js"></script>

<script>

let escuelaPicker = rut("BeeplayCodigosEscuelas");
let selectElemnt = document.getElementById("Escuelas");
escuelaPicker.on("child_added", datos =>{
    let cargarEscuela = '<option value='+ datos.child("idEscuela").val() +'>'+datos.child("NombreEscuela").val()+'</option>'
    selectElemnt.insertAdjacentHTML("beforeend",cargarEscuela);
});

</script>







