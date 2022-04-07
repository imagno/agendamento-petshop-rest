const customExpress = require('./config/customExpress');
const conexao = require('./database/conexao');

const PORT = 3000;

conexao.connect(erro => {
  if(erro) {
    console.log(erro);
  } else {
    console.log('Banco de dados conectado com sucesso');

    const app = customExpress();

    app.listen(PORT, () => 
      console.log(`servidor rodando na porta ${PORT}`)
    );
  }
});