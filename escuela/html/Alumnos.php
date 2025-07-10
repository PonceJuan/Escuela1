<!--Importa el HEADER (Menu lateral)-->
<?php require('Header.php') ?>

<div class="main-content container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Alumnos</h3>                            
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
                                <h4 class="modal-title" id="myModalLabel33">Detalles del Alumno</h4>
                              
                            </div>
                            
                            <input id="id" hidden> <!-- ID que vamos a recibir de firebase -->
                            <input id="imagen" type="hidden"> <!--Toma el nombre de la imagen-->
                           
                            <div class="modal-body">
                                
                                <label>Foto de Perfil: </label>
                                <div class="form-group">                                                
                                    <img id="Foto" width = "200px" heigth = "200px"> 
                                    <div class="form-group">                                                
                                    <input accept="image/png,image/jpeg" id="Imagen" type="file" placeholder="Nombre de la escuela" 
                                        class="form-control">                                                    
                                    </div>                                             
                                </div>  
                                
                                <label>Nombre: </label>
                                <div class="form-group">                                                
                                    <input id="Nombre" type="name" placeholder="..." 
                                        class="form-control">                                                    
                                </div>  

                                <label>Maestra: </label>
                                <div class="form-group">                                                
                                    <input disabled id="Maestra" type="text" placeholder="..." 
                                        class="form-control"> <br>
                                    <button type="submit" id="btnAgregarMaestro"  class="btn btn-primary" translate="1">Agregar Maestro</button>

                                </div> <br>
                                <label>Tutor 1: </label> 
                                <div  class="form-group">                                                
                                    <input id="Tutor1" type="text" placeholder="..." 
                                        class="form-control" disabled>  <br>

                                        <button type="submit" id="btnAgregarTutor1"  class="btn btn-primary" translate="1">Agregar Tutor 1</button>

                                </div>  <br>
                                <label>Tutor 2 : </label>
                                <div  class="form-group">                                                
                                    <input id="Tutor2" type="text" placeholder="..." 
                                        class="form-control" disabled> <br>

                                        <button type="submit" id="btnAgregarTutor2"  class="btn btn-primary" translate="1">Agregar Tutor 2</button>

                                </div> <br>
                                <label>Teléfono: </label>
                                <div class="form-group">                                                
                                    <input id="Telefono" type="text" placeholder="..." 
                                        class="form-control">                                                    
                                </div>
                                <label>Tipo de Sangre: </label>
                                <div class="form-group">       
                                    <select  class="form-control" name="" id="TipoSangre">
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>                                         
                                                                                 
                                </div>
                                <label>Alergias: </label>
                                <div class="form-group">                                                
                                    <input id="Alergias" type="text" placeholder="..." 
                                        class="form-control">                                                    
                                </div>
                                
                                
                            </div> 
                            <div class="modal-footer">
                                    <button type="submit" id="btnGuardar"  class="btn btn-primary" translate="1">Guardar</button>
                                </div>
                             
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->





                <button type="submit" id="btnNuevo"  class="btn btn-primary" translate="1">Agregar un Alumno</button>
                 
             </div>

                <div class="card-body">                          

                    <table class='table table-striped' id="tablaMaster">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Maestra</th>
                                <th>Tutor 1</th>
                                <th>Tutor 2 </th>
                                <th>Teléfono</th>
                                <th>Tipo Sangre</th>
                                <th>Foto</th>
                                <th>Alergias</th>
                                <th>idMaestra</th>
                                <th>idTutor1</th>
                                <th>idTutor2</th>
                                <th>Actions</th>                                       
                            </tr>
                        </thead>
                        <tbody>                                    
                        </tbody>                                
                    </table>

                </div>

                                              <!--scrolling content Modal Maestros -->
                                              <div class="modal fade" id="modalMaestro" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Lista de Maestros</h4>
                            </div>
                            
                            <input id="idMaestro" hidden> <!-- ID que vamos a recibir de firebase -->
                           
                           
                            <div class="modal-body">
                                
                               
                                <label>Maestros: </label>
                                <div class="form-group">  
                                    <select  class="form-control" name="" id="Profesores">
                                        
                                    </select>   
                                
                            </div> 
                            <div class="modal-footer">
                                    <button type="submit" id="btnGuardarMestros"  class="btn btn-primary" translate="1">Guardar Maestro</button>
                                </div>
                             
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->



                
            </div>

                       <!--scrolling content Modal Maestros -->
           <div class="modal fade" id="modalTutor1" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Lista de Tutores</h4>
                              
                            </div>
                            
                            <input id="idMaestro" hidden> <!-- ID que vamos a recibir de firebase -->
                           
                           
                            <div class="modal-body">
                                
                               
                                <label>Tutores: </label>
                                <div class="form-group">  
                                    <select  class="form-control" name="" id="Tutores1">
                                        
                                    </select>   
                                
                            </div> 
                            <div class="modal-footer">
                                    <button type="submit" id="btnGuardarTutores1"  class="btn btn-primary" translate="1">Guardar Tutor1</button>
                                </div>
                             
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->

        </section>
        
            <!--scrolling content Modal Maestros -->
            <div class="modal fade" id="modalTutor2" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel33">Lista de Tutores</h4>
                              
                            </div>
                            
                            <input id="idMaestro " hidden > <!-- ID que vamos a recibir de firebase -->
                           
                           
                            <div class="modal-body">
                                
                               
                                <label>Tutores: </label>
                                <div class="form-group">  
                                    <select  class="form-control" name="" id="Tutores2">
                                        
                                    </select>   
                                
                            </div> 
                            <div class="modal-footer">
                                    <button type="submit" id="btnGuardarTutores2"  class="btn btn-primary" translate="1">Guardar Tutor2</button>
                                </div>
                             
                        </div>
                    </div>
                </div>
          <!--scrolling content Modal -->
    </div>
    </div>
  </div>




<!--Importa el FOOTER (Script necesarios)-->
<?php require('Footer.php') ?>  

<!--Importa el SCRIPT de ESCUELAS-->
<script src="../js/alumnos.js" type="module"></script>

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







