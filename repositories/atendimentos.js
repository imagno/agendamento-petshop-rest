const query = require('../admin/database/queries');

class Atendimento {
  adiciona(atendimento) {
    const sql = 'INSERT INTO atendimentos SET ?'
    return query(sql, atendimento);
  }
}

module.exports = new Atendimento;