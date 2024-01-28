function parImpar(txtnumero) {
  var numero = parseInt(txtnumero);
  if (isNaN(numero) || !Number.isInteger(numero)) {
    alert("La entrada no es un número entero válido.");
    return;
  }

  if (numero % 2 === 0) {
    alert("El número es par");
  } else {
    alert("El número es impar");
  }
}

function analizarTexto() {
  let texto = prompt("Por favor, introduce un texto");

  if (texto === texto.toUpperCase()) {
    alert("El texto está en mayúsculas");
  } else if (texto === texto.toLowerCase()) {
    alert("El texto está en minúsculas");
  } else {
    alert("El texto tiene una mezcla de mayúsculas y minúsculas");
  }
}

function procesarArray(cadena) {
  // Divide el string en un array utilizando la coma como separador
  let array = cadena.split(',');

  // Convierte todos los elementos a mayúsculas y los reordena en orden inverso
  let resultado = array.map(elemento => elemento.toUpperCase()).reverse();

  // Serializa el resultado como JSON
  let resultadoJSON = JSON.stringify(resultado);

  // Imprime el resultado en la consola y en el elemento con id "logger"
  logMessage(resultadoJSON);
}

function logMessage(msg) {
  var logger = document.getElementById("logger");
  console.log(msg);
  logger.innerHTML = msg;
}

