const fs = require('fs');

fs.readFile('../assets/salsicha.jpg', (erro, buffer) => {

  fs.writeFile('../assets/salsicha2.jpg', buffer, (error) => {
    console.log('A imagem foi escrita');
  });
});