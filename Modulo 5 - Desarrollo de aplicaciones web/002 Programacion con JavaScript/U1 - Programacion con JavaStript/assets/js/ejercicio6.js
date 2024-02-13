const notas = [6, 7, 2, 9, 3, 4, 5, 8, 2];

function sumaFor(msg) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
      suma += notas[i];
  }
  logMessage(`La suma total usando for es: ${suma}`);  
}

function sumaForOf(msg) {
  let suma = 0;
  for (let nota of notas) {
    suma += nota;
  }
  logMessage(`La suma total usando for of es: ${suma}`);
}



function logMessage(msg) {
  var logger = document.getElementById("logger");
  console.log(msg);
  logger.innerHTML += msg + "<br>";
}
