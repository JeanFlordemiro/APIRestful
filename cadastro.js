// Configuração inicial
const express = require("express"); // Importanto express
const mongoose = require("mongoose"); // Importando mongoose
const app = express();

// Configurando leitura de arquivos JSON
app.use(
  // Iniciando a configuração
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); // Encerrando a configuração

// Rotas da API

const clienteRotas = require("./routes/clienteRotas"); // Inserindo rota

app.use("/cliente", clienteRotas); // Definindo rotas a serem acessadas

// Conexão com MongoDB

const US_Login = "JeanFlordemiro";
const US_Keyword = encodeURIComponent("lPwsEH5AlXT7GywE");

mongoose
  .connect(
    `mongodb+srv://${US_Login}:${US_Keyword}@clusterapi.ema5t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000); // Justificando a configuração no packpage.json
  })
  .catch(() => {
    console.log("Erro ao tentar conectar ao MongoDB");
  });

// Rota inicial / endpoint

app.get("/", (requisição, resposta) => {
  // Mostrar requisição

  resposta.json({ mensagem: "Olá Usuário!" });
});
