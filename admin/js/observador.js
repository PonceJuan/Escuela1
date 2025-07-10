    firebase.auth().onAuthStateChanged((user) => { //Verifica si hay SESION INICIADA
        if (user) {        //Hay Sesion Inciada 
          var variables = sessionStorage.length;
          if (variables==0){
            cerrarsesion();
          }
        } else {          //No hay Sesion Iniciada          
          window.location.href ="session.html";
        }
      });
      //Funcion de Cerrar Sesion
      function cerrarsesion(){
        window.location.href ="session.html"; //Envia a Inicio de Sesión
        sessionStorage.clear();
        firebase.auth().signOut()
        .then(function(){
          storage.clear();
          window.location.href ="session.html"; //Envia a Inicio de Sesión
        })
        .catch(function(error){ //Si sucede algun error.
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un erro, Intentalo de nuevo',                
              }); 
        })
    }
