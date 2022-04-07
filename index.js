const customExpress = require('./config/customExpress');
const conexao = require('./database/conexao');
const Entidades = require('./database/entidades')

const PORT = 3000;

conexao.connect(erro => {
  if(erro) {
    console.log(erro);
  } else {
    console.log('Conectado no banco de dados com sucesso');

    Entidades.init(conexao);
    const app = customExpress();

    app.listen(PORT, () => 
      console.log(`Rodando servidor na porta ${PORT}`)
    );
  }
});