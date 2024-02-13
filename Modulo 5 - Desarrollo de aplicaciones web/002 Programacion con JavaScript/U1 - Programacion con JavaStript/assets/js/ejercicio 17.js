function mostrarInformacion(div) {
  clearMessage();

  // Número de enlaces de la página
  const enlaces = div.getElementsByTagName('a');
  const numEnlaces = enlaces.length;
  console.log(`Número de enlaces de la página: ${numEnlaces}`);

  // Dirección a la que enlanza el penúltimo enlace
  const penultimoEnlace = enlaces[numEnlaces - 2];
  const direccionPenultimoEnlace = penultimoEnlace ? penultimoEnlace.href : 'No hay suficientes enlaces';
  console.log(`Dirección a la que enlanza el penúltimo enlace: ${direccionPenultimoEnlace}`);

  // Número de enlaces del tercer párrafo
  const parrafos = div.getElementsByTagName('p');
  const tercerParrafo = parrafos[2];
  const numEnlacesTercerParrafo = tercerParrafo ? tercerParrafo.getElementsByTagName('a').length : 0;
  console.log(`Número de enlaces del tercer párrafo: ${numEnlacesTercerParrafo}`);

  // Pintar los resultados al final de la página
  const contenido = document.getElementById('logger');
  const nodo = document.createElement('p');
  
  const linea1 = document.createTextNode(`Número de enlaces de la página: ${numEnlaces}`);
  const linea2_1 = document.createTextNode(`Dirección a la que enlanza el penúltimo enlace: `);
  const linea2_2 = document.createElement('a');
  linea2_2.href = direccionPenultimoEnlace;
  linea2_2.textContent = `${direccionPenultimoEnlace}`;
  const linea3 = document.createTextNode(`Número de enlaces del tercer párrafo: ${numEnlacesTercerParrafo}`);
  
  nodo.appendChild(linea1);
  nodo.appendChild(document.createElement('br'));
  nodo.appendChild(linea2_1);
  nodo.appendChild(linea2_2);
  nodo.appendChild(document.createElement('br'));
  nodo.appendChild(linea3);
  
  contenido.appendChild(nodo);
}


function clearMessage() {
  var logger = document.getElementById("logger");
  logger.innerHTML = "";
}