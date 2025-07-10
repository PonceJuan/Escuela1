function savePhoto(imagenproducto){
    let storageRef = firebase.storage().ref(); //Crear la referencia para STORAGE
   
    let name =new Date()+"-"+ imagenproducto.name;                              //Fecha + Nombre de la Foto
    const metadata = {
        contentType: imagenproducto.type
    }
    
    let task = storageRef.child(name).put(imagenproducto, metadata);
    task.
    then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        return url;
    }); 
   
}