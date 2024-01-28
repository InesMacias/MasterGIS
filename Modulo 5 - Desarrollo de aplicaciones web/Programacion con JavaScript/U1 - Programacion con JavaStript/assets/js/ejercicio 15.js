function procesarUsuarios() {
  const users = [
    {username: 'ppc90', age: 30, premium: false},
    {username: 'lu65', age: 24, premium: false},
    {username: 'maria3', age: 36, premium: false},
    {username: 'abc123', age: 20, premium: true},
    {username: 'sergio58', age: 26, premium: true}
  ];

  clearMessage();  

  // Pintar en la consola una frase por cada usuario que es premium
  for (let user of users) {
    if (user.premium) {
      logMessage(`El usuario ${user.username} es premium`,true);
    }
  }

  // Crear un array con los usuarios que no son premium
  const usuariosNoPremium = users.filter(user => !user.premium);

  logMessage('Usuarios que no son premium:',true);
  logMessage(JSON.stringify(usuariosNoPremium),true);
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

function clearMessage() {
  var logger = document.getElementById("logger");
  logger.innerHTML = "";
}