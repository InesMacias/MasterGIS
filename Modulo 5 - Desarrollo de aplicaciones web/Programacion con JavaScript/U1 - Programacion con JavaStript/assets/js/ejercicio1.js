function calcularVolumen() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var z = document.getElementById("z").value;

    var resultado = x * y * z;

    document.getElementById("resultado").innerHTML = "El resultado es: " + resultado;
    console.log('volumen', resultado);
}
