function calcularLetraDNI(dni) {
  if (typeof dni !== 'string' || !/^\d{8}$/.test(dni)) {
    logMessage('El DNI debe ser un número positivo de 8 cifras');
    return dni;
  }
  
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni) % 23;
  const letra = letras.charAt(numero);
  const nif =  dni + '-' + letra;

  logMessage('La letra del NIF es la - ' + letra);

  return nif;
}


function logMessage(msg) {
  var logger = document.getElementById("logger");
  console.log(msg);
  logger.innerHTML = msg;
}
