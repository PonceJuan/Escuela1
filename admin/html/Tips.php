<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Bee Play Tips</h3>                            
                </div>
                
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header">
                    <button id="btnNuevo" type="button" class="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target="#modalAltaEdicion">
                        Crear Bee Play Tips
                    </button>

                    <!--scrolling content Modal -->
                    <div class="modal fade" id="modalAltaEdicion" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Detalles de Tips</h4>
                              
                            </div>
                            
                            <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body">
                                
                                <div class="form-group">
                                    <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                                </div>   
                                
                                <label>Título de Tip: </label>
                                <div class="form-group">                                                
                                    <input id="Titulo" type="name" placeholder="Titulo de tips" 
                                        class="form-control">                                                    
                                </div>  

                                <label>Descripción: </label>
                                <div class="form-group">                                                
                                    <input id="Descripcion" type="text" placeholder="Descripcion" 
                                        class="form-control" >                                                    
                                </div> 

                                <label>Tipo: </label>
                                <div class="form-group">                                                
                                    <input id="Tipo" type="text" placeholder="Tipo" 
                                        class="form-control" >                                                    
                                </div> 

                                <label>Imagen: </label>
                                <div class="form-group">                                                
                                    <input id="Foto" type="file" accept="image/png,image/jpeg" placeholder="Tipo" 
                                        class="form-control" >                                                    
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
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Foto</th>
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
<script src="../js/tips.js" type="module"></script>

<!--Importa la GUARDAR FOTOS-->
<script src="../../js/savephoto.js"></script>







