//Tablas para exportar

//Tabla 1 (Editar(btnEditar) y Eliminar(btnBorrar))
export function crearTABLA1 (dataSet,botones, ocultos){

    var table = $('#tablaMaster').DataTable({
        pageLength : 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        columnDefs: [
            {
                targets: ocultos, 
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,        
                defaultContent:botones
            }
        ]	   
    });
    //Retorno la tabla
    return table;
}



