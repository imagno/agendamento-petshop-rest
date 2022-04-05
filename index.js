const express = require('express');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});

app.get('/atendimentos', (_, res) => {
  res.status(200).send('Você está na rota de atendimentos.');
});