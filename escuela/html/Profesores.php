<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Profesores</h3>                            
                </div>
                
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header">

                    <!--scrolling content Modal -->
                    <div class="modal fade" id="modalAltaEdicion" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Detalles de Profesor</h4>
                              
                            </div>
                            
                            <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body">
                                
                                <label>Foto de Perfil: </label>
                                <div class="form-group">                                                
                                    <img id="Foto" width = "200px" heigth = "200px">                                                   
                                </div>  
                                
                                <label>Nombre de Profesor: </label>
                                <div class="form-group">                                                
                                    <input id="Nombre" type="name" placeholder="Nombre de la escuela" 
                                        class="form-control">                                                    
                                </div>  

                                <label>Correo Electrónico: </label>
                                <div class="form-group">                                                
                                    <input id="Correo" type="text" placeholder="Correo electrónico" 
                                        class="form-control"> 

                                </div> <label>Teléfono: </label>
                                <div class="form-group">                                                
                                    <input id="Telefono" type="text" placeholder="Correo electrónico" 
                                        class="form-control" >                                                    
                                </div>

                                <label>Biografía: </label>
                                <div class="form-group">                                                
                                    <input id="Biografia" type="text" placeholder="Correo electrónico" 
                                        class="form-control" >                                                    
                                </div>

                                <label>Grupo: </label>
                                <div class="form-group">                                                
                                    <input id="Grupo" type="text" placeholder="Correo electrónico" 
                                        class="form-control" >                                                    
                                </div>
                                                                
                            </div> 

                            <div class="modal-footer">
                                <button type="submit" id="btnGuardar"  class="btn btn-primary" translate="1">Guardar</button>
                            </div>
                             
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->

                
                <br>
                <button type="submit" id="btnNuevo"  class="btn btn-primary" translate="1">Crear Profesor</button>
                 
             </div>

                <div class="card-body">                          

                    <table class='table table-striped' id="tablaMaster">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Biografía</th>
                                <th>Grupo</th>
                                <th>Foto </th>
                                <th>Actions</th>                                       
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
<script src="../js/profesores.js" type="module"></script>

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







