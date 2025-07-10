function VerificarUsuario() {
  //Creacion de variables que toman datos del FORM
  var correo = document.getElementById('username').value;
  var contrasena = document.getElementById('password').value;  
  let llamada = 0; 
  if (correo == "" || contrasena == ""){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe ingresar un corre y una contraseña',                
    }); 
  } else {
      //Autenticacion
  firebase.auth().signInWithEmailAndPassword(correo, contrasena)
  .then((user) => {
    // Acceso de Usuario
    firebase.auth().onAuthStateChanged((user) => {
      
        if (user) {
        

          let  db = firebase.database();
          let ruta =  db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child("BeeplayCodigosEscuelas")

          ruta.orderByChild("idEscuela").equalTo(user.uid).on("child_added", datos => { 
            sessionStorage.setItem("IdEscuela", user.uid);
            window.location.href ="../html/Home.php"; 
            llamada = 1;   
          });

          setTimeout(function(){
            if (llamada == 0){
              Swal.fire({
                title: "Acceso no autorizado",
                text: "Este usuario no esta autorizado a esta sección",
                icon: "error"
              });
            }
          }, 5000);
          // ...
        } else {  //Else del IF(USER)
          // Sesion no iniciada
          window.location.href ="session.html";
        }
      });
    // ...
  })
  .catch((error) => { //Catch de Firebase.Auth
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las credenciales no son correctas, Intenta de nuevo',                
      }); 
  });
  }

}


