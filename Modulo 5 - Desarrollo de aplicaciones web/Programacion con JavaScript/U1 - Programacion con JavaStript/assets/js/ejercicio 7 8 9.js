function sumaPares(txtnumeros) {
  if (txtnumeros === undefined) {
    logMessage("La entrada no contiene números.");
    return 0;
  }

  let numeros;
  if (Array.isArray(txtnumeros)) {
    numeros = txtnumeros.map(Number);
  } else if (txtnumeros.includes(',')) {
    numeros = txtnumeros.split(',').map(Number);
  } else {
    numeros = [Number(txtnumeros)];
  }

  let suma = 0;
  for (let numero of numeros) {
    if (numero % 2 === 0) {
      suma += numero;
    }
  }

  logMessage("La suma de los números pares es: " + suma);
}

function eliminarConsonantes(frase) {
  logMessage(frase.replace(/[bcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ]/g, ''));
}

function celsiusAFahrenheit(celsius) {
  if (typeof celsius !== 'number') {
    celsius = parseFloat(celsius);
    if (isNaN(celsius)) {
      logMessage("La entrada no es un número válido para convertir de Celsius a Fahrenheit.");
      return;
    }
  }

  let fahrenheit = celsius * 9/5 + 32;
  logMessage(celsius + " grados Celsius equivale a " + fahrenheit + " grados Fahrenheit.");
}

function logMessage(msg) {
  var logger = document.getElementById("logger");
  console.log(msg);
  logger.innerHTML = msg;
}

