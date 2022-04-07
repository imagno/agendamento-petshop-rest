module.exports = app => {
  app.get('/atendimentos', (_, res) =>
    res
      .status(200)
      .send('Você está na rota de atendimentos e está realizando um GET.')
  );

  app.post('/atendimentos', (req, res) =>{
    console.log(req.body);

    res
      .status(200)
      .send('Você está na rota de atendimentos e está realizando um POST');
  });
}