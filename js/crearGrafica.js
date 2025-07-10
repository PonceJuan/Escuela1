function grafica(nombreGrafica, pesoPromedio, titulos) {
    let miCanvas = document.getElementById("MiGrafica").getContext("2d");

    let chart = new Chart(miCanvas, {
        type : "bar",
        data: {
            labels : titulos,
            datasets : [
                {
                    label: nombreGrafica,
                    backgroundColor : "rgb(0,0,0)",
                    borderColor: "rgb(255,255,0)",
                    data: pesoPromedio
                }
            ]
        }
    })
}