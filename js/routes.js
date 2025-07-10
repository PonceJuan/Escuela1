function rut(tabla){
    let  db = firebase.database();
    return db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child(tabla)
}

function rutaCustom(tabla){
    let  db = firebase.database();
    return db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("apps").child(tabla).child("members")
}

function rut2(tabla,usuario, tabla2){
    let  db = firebase.database();
    return db.ref().child("projects").child("proj_njgpnbYAnHNy8HFVWbr4Py").child("data").child(tabla).child(usuario).child(tabla2)
}

