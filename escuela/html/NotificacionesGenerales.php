<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Notificaciones Generales</h3>                            
                </div>
                
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header">



          <!--MODAL 2-->
          <div class="modal fade" id="modalEventos" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Notificaciones Generales</h4>
                              
                            </div>
                            
                            <input id="id" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body"> 

                            <table class='table table-striped' id="tablaMaster2">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                        <th>Fecha Notificación</th>
                                        <th>Leido</th>                                        
                                                
                                    </tr>
                                </thead>              
                            </table>
                            </div> 
                             
                        </div>
                    </div>
                </div>
                <!--FIN DE MODAL  2-->


                <button type="submit" id="NuevoNotificacion"  class="btn btn-primary" translate="1">Crear Notificación</button>
   
                 
                 
             </div>

                <div class="card-body">                          

                    <table class='table table-striped' id="tablaMaster">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Alumno</th>
                                <th>Nombre Maestra</th>
                                <th>Actions</th>                                       
                            </tr>
                        </thead>
                        <tbody>                                    
                        </tbody>                                
                    </table>
                </div>
            </div>
        </section>
          <!--MODAL 2-->
          <div class="modal fade" id="modalNotificacion" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Notificaciones Generales</h4>
                              
                            </div>
                            
                            <input id="id3" type="hidden"> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body"> 

                            <label>Notificacion: </label>

                                <div class="form-group">                                                
                                    <input id="Nombre3" type="name" placeholder="..." 
                                        class="form-control">                                                    
                                </div>  
                            </div> 
                             <div class="modal-footer">
                             <button type="submit" id="EnviarNotificacion"  class="btn btn-primary" translate="1">Enviar Notificación</button>
                             </div>
                        </div>
                    </div>
                </div>
                <!--FIN DE MODAL  2-->


    </div>
    </div>
  </div>

          


<!--Importa el FOOTER (Script necesarios)-->
<?php require('Footer.php') ?>  

<!--Importa el SCRIPT de ESCUELAS-->
<script src="../js/notificacionesgenerales.js" type="module"></script>

<!--Importa la GUARDAR FOTOS-->
<script src="../../js/savephoto.js"></script>









