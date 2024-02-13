function realizarOperaciones() {
  const data = ["hola", 2, 5, "adios"];

  // Determinar cuál de los dos números que hay en el array es mayor
  const num1 = data[1];
  const num2 = data[2];
  const mayor = num1 > num2 ? num1 : num2;
  logMessage(`El número mayor es: ${mayor}`);

  // Determinar el resultado de las cinco operaciones numéricas realizadas con los dos elementos numéricos
  const suma = num1 + num2;
  const resta = num1 - num2;
  const multiplicacion = num1 * num2;
  const division = num1 / num2;
  const modulo = num1 % num2;

  logMessage(`Suma: ${suma}`);
  logMessage(`Resta: ${resta}`);
  logMessage(`Multiplicación: ${multiplicacion}`);
  logMessage(`División: ${division}`);
  logMessage(`Módulo: ${modulo}`);
}

function logMessage(msg) {
    var logger = document.getElementById("logger");
    console.log(msg);
    logger.innerHTML += msg + "<br>";
}
