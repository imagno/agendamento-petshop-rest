const Atendimento = require('../models/atendimentos');

module.exports = app => {
  app.get('/atendimentos', (_, res) =>
    res
      .status(200)
      .send('Você está na rota de atendimentos e está realizando um GET.')
  );

  app.post('/atendimentos', (req, res) =>{
    const atendimento = req.body;
    Atendimento.adiciona(atendimento);

    res
      .status(200)
      .send('Você está na rota de atendimentos e está realizando um POST');
  });
}