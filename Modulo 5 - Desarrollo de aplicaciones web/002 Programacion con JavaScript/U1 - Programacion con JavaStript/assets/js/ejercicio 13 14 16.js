function separarParImpar() {
  const numbers = [253, 8575, 1, 20, 562, 1233, 25, 27, 258, 254, 7485, 2683]; 

  const pares = numbers.filter(num => num % 2 === 0);
  const impares = numbers.filter(num => num % 2 !== 0);

  const msg = `Números pares: ${JSON.stringify(pares)}, Números impares: ${JSON.stringify(impares)}`;
  logMessage(msg);
}

function procesarMeses() {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const mesesLargos = meses.filter(mes => mes.length > 7).map(mes => mes.toUpperCase());

  const cantidadMesesLargos = mesesLargos.length;

  logMessage(`Meses con más de 7 letras: ${mesesLargos}`);
  logMessage(`Cantidad de meses con más de 7 letras: ${cantidadMesesLargos}`,true);
}

class Cuadrado {
  constructor(lado) {
      this.lado = lado;
  }

  calcularPerimetro() {
      const perimetro = this.lado * 4;
      logMessage(`El perímetro del cuadrado es: ${perimetro} cm`,true);
      return perimetro;
  }

  calcularArea() {
      const area = this.lado * this.lado;
      logMessage(`El área del cuadrado es: ${area} cm^2`,true);
      return area;
  }
}


// Crear instancias de cuadrados de diferentes tamaños
function ejercicio16() {
  clearMessage();

  const cuadradoPequeno = new Cuadrado(2);
  const cuadradoMediano = new Cuadrado(5);
  const cuadradoGrande = new Cuadrado(10);

  // Calcular el perímetro y el área de cada cuadrado
  cuadradoPequeno.calcularPerimetro();
  cuadradoPequeno.calcularArea();

  cuadradoMediano.calcularPerimetro();
  cuadradoMediano.calcularArea();

  cuadradoGrande.calcularPerimetro();
  cuadradoGrande.calcularArea();
}

function logMessage(msg, append = false) {
  var logger = document.getElementById("logger");
  console.log(msg);
  if (append) {
    logger.innerHTML += msg + "<br>";
  }
  else {
    logger.innerHTML = msg + "<br>";
  }
}

function clearMessage(msg, append = false) {
  var logger = document.getElementById("logger");
  logger.innerHTML = "";
}