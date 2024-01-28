function logFechaCumpleanos() {
    const fechaCumple = {
        day: 27,
        month: 'Julio'
      };

    resultado = 'Mi fecha de cumpleaños es ' + fechaCumple.day + ' de ' + fechaCumple.month;  
    document.getElementById("resultado").innerHTML = resultado;
    console.log(resultado);
}
