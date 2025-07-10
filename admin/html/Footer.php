  <!--Importa librerias para el CSS-->
  <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/sidebarmenu.js"></script>
  <script src="../assets/js/app.min.js"></script>
  <script src="../assets/libs/apexcharts/dist/apexcharts.min.js"></script>
  <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
  <script src="../assets/js/dashboard.js"></script>
  
   <!-- The core Firebase JS SDK is always required and must be listed first -->
   <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase.js"></script>
   <script src="../js/main.js"></script>

   <!--importa librerias para verificar si la sesión esta activa-->
  <<script src="../js/observador.js"></script>

  <!--Libreria de DataTable-->
  <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
  
  <!--SweetAlert-->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

   <!--Carga los Icono para DATA TABLES-->
   <script src="../../js/icons.js"></script>

    <!--Carga las rutas-->
    <script src="../../js/routes.js"></script>
    
  <!--MOMENT.JS-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>


 </body>

  <!--Establece las foto de USUARIO-->
  <script>
    if (sessionStorage.getItem("FotoPerfil") != null){
      document.getElementById("FotoPerfil").src = sessionStorage.getItem("FotoPerfil");
    }
    
  </script>

</html>