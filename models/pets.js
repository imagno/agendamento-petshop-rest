const conexao = require('../database/conexao');

class Pet {
  adiciona(pet, res) {
    const query = 'INSERT INTO pets SET ?';

    conexao.query(query, pet, erro => {
      if(erro) {
        console.log(erro);
        res.status(400).json(erro);
      } else {
        res.status(200).json(pet);
      }
    });
  }
}

module.exports = new Pet();