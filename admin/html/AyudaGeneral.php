<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Bee Play Ayuda General</h3>                            
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
                                <h4 class="modal-title" id="myModalLabel33">Detalles de Escuela</h4>
                            </div>
                            
                            <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body">
                                
                                <div class="form-group">
                                    <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                                </div>   
                                
                                <label>Nombre de la Escuela: </label>
                                <div class="form-group">                                                
                                    <input id="Nombre" type="name" placeholder="Nombre de la escuela" 
                                        class="form-control">                                                    
                                </div>  

                                <label>Correo: </label>
                                <div class="form-group">                                                
                                    <input id="Correo" type="text" placeholder="Correo electrónico" 
                                        class="form-control" >                                                    
                                </div> 
                                <div id="containerClave">
                                  <label>Contraseña: </label>
                                  <div class="form-group">                                                
                                      <input id="Clave" type="text" placeholder="Contraseña" 
                                          class="form-control" >                                                    
                                  </div>
                                </div>
                                
                            </div> 
                            <div class="modal-footer">                                            
                                <button type="submit" id="GuardarDatos" value="btnGuardar" class="btn btn-primary" translate="1">Guardar</button>
                            </div>  
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->
   
                 
                 
             </div>

                <div class="card-body">                          

                    <table class='table table-striped' id="tablaMaster">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Usuario</th>
                                <th>Descripción</th>
                                <th>Fecha Solicitud</th>
                                <th>Tipo Ayuda</th>
                                <th>Teléfono</th>
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
<script src="../js/ayudageneral.js" type="module"></script>

<!--Importa la GUARDAR FOTOS-->
<script src="../../js/savephoto.js"></script>







