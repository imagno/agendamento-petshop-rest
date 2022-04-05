module.exports = app => {
  app.get('/atendimentos', (_, res) =>
    res
      .status(200)
      .send('Você está na rota de atendimentos.')
  );
}