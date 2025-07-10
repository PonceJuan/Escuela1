function VerificarUsuario() {
  //Creacion de variables que toman datos del FORM
  var correo = document.getElementById('username').value;
  var contrasena = document.getElementById('password').value;   
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
          
           //////Buscar Codigo Exacto///
            let starCountRef = firebase.database().ref('projects/proj_njgpnbYAnHNy8HFVWbr4Py/data/BeePLayAdministradores/' + user.uid);
                starCountRef.on('value', (snapshot) => {
                    let data = snapshot.val();
                        if (data == null){
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Este usuario no tiene acceso a la parte de Administración',                
                          }); 
                        }else{
                          //---------Escritura:
                          sessionStorage.setItem("IdAdministrador", user.uid);
                          window.location.href ="../html/Alumnos.php";
                        }
            });
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


