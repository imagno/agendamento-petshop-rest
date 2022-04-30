const conexao = require('../database/conexao');
const uploadDeArquivo = require('../archive/uploadDeArquivos');

class Pet {
  adiciona(pet, res) {
    const query = 'INSERT INTO pets SET ?';

    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho, ) => {
      if(erro) {
        const novoPet = { nome: pet.nome, imagem: novoCaminho}

        conexao.query(query, novoPet, erro => {
          if(erro) {
            console.log(erro);
            res.status(400).json(erro);
          } else {
            res.status(200).json(novoPet);
          }
        });
      } else {
        res.status(400).json({ erro });
      }
    });
  }
}

module.exports = new Pet();