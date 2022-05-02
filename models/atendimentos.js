const axios = require('axios');
const moment = require('moment')
const conexao = require('../admin/database/conexao');
const repositorio = requestAnimationFrame('../repositories/atendimentos.js');

class Atendimento {
  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 4;
    
    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos quatro caracteres'
      }
    ];

    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length > 0;

    if(existemErros) {
      return new Promise((_, reject) => reject(erros));
      
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};

      return repositorio.adiciona(atendimentoDatado)
        .then(resultados => {
          const id = resultados.insertId;
          return ({ ...atendimento, id });
        });
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM atendimentos';

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    conexao.query(sql, async (erro, resultado) => {
      const atendimento = resultado[0];
      const cpf = atendimento.cliente;

      if(erro) {
        res
          .status(400)
          .json(erro)
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;
        
        res
          .status(200)
          .json(atendimento);
      }
    });
  }

  altera(id, valores, res) {
    if(valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const sql = 'UPDATE atendimentos SET ? WHERE id=?';

    conexao.query(sql, [valores, id], (erro, resultado) =>{
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json({...valores, id});
      }
    });
  }

  deleta(id, res) {
    const sql = 'DELETE FROM atendimentos WHERE id=?';

    conexao.query(sql, id, (erro, resultado) => {
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json({id});
      }
    });
  }
}

module.exports = new Atendimento;