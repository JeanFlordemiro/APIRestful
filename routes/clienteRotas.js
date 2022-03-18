const router = require("express").Router();
const { get } = require("express/lib/response");
const cli = require("nodemon/lib/cli");
const Cliente = require("../models/Cliente"); // Importando Model Cliente

// create > Criação de dados
router.post("/", async (requisição, resposta) => {
  // Tratando dados vindos do Body
  const { Nome, Idade, Profissão, Nacionalidade, Destino, ClienteAprovado } =
    requisição.body;

  if (!Nome) {
    resposta.status(422).json({
      erro: "Campo obrigatório não preenchido, Usuário não cadastrado",
    });
    return;
  }

  const cliente = {
    Nome,
    Idade,
    Profissão,
    Nacionalidade,
    Destino,
    ClienteAprovado,
  };

  // Utilizando o create do mongoose para inserir dados

  try {
    // Criando dados
    await Cliente.create(cliente);
    resposta.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (erro) {
    resposta.status(500).json({ erro: erro });
  }
});

// Read -Leitura de dados

router.get("/", async (requisição, resposta) => {
  try {
    const retornoDados = await Cliente.find(); // Esse método garante que todos os dados da collection sejam retornados

    resposta.status(200).json(retornoDados); //Dados serão retornados aqui
  } catch (erro) {
    resposta.status(500).json({ erro: erro });
  }
});

// Filtro de pesquisa por ID

router.get("/:id", async (requisição, resposta) => {
  // Extraíndo dado da requisição pela url

  const id = requisição.params.id; // requerindo o dado a partid de ID

  try {
    const cliente = await Cliente.findOne({ _id: id }); // Como a busca nesse ponto é filtrada pelo ID, e o elemento em questão nunca se repete, a busca é feita por findoOne que por sua vez tem dentro de sua estrutura um filtro apontando para ID

    if (!cliente) {
      // Condicional com mensagem para caso o usuário não seja encontrado no banco de dados
      resposta.status(422).json({ mensagem: "Usuário não encontrado!" });
      return;
    }

    resposta.status(200).json(cliente); // O dado é retornado nesse ponto caso seja encontrado
  } catch (erro) {
    // Se não encontrar, retorna um erro
    resposta.status(500).json({ erro: erro });
  }
});

// Update > Atualização de dados com PUT e PATCH

router.patch("/:id", async (requisição, resposta) => {
  // Enquanto a URL virá com o ID do usuário, o body virá responderá com os dados a serem atualizados

  const id = requisição.params.id; // requerindo o dado a partid de ID

  const { Nome, Idade, Profissão, Nacionalidade, Destino, ClienteAprovado } =
    requisição.body;

  const cliente = {
    Nome,
    Idade,
    Profissão,
    Nacionalidade,
    Destino,
    ClienteAprovado,
  };

  // De maneira bem simples, vamos atualizar os dados, salva-los numa variável e retorna-los atualizados
  try {
    const updateDados = await Cliente.updateOne({ _id: id }, cliente); // Por se tratar de uma atualização onde a filtragem é feita em ID que é uma valor unico, mantemos o updateOne como método a ser utilizado para a filtragem de dados, apontando para a url _id e referênciando a const id com a requisição solicitada para encontrar o usuário pelo seu ID. Por último apontamos para um segundo argumento onde estará listado o updade a ser feito na const cliente

    if (updateDados.matchedCount === 0) {
      // matchCount fará a contagem de registros atualizados. Se o número de registros atualizados for exatamente igual a 0...
      resposta.status(422).json({ mensagem: "Usuário não encontrado!" });
      return;
    }
    // Observação: matchedCount fará a contagem mesmo que os dados inseridos para atualizar um devido cadastro sejam idênticos aos anteriores, por tanto o contador só ficará em 0, caso não encontre pelo filtro id nenhum registro no banco de dados, retornando então a mensagem na condicional if

    resposta.status(200).json(cliente);
  } catch (erro) {
    resposta.status(500).json({ erro: erro });
  }
});

// Delete > Deletar usuário

router.delete("/:id", async (requisição, resposta) => {
  const id = requisição.params.id;

  const cliente = await Cliente.findOne({ _id: id });

  if (!cliente) {
    resposta.status(422).json({ mensagem: "O usuário não foi encontrado" });
    // Aqui temos um exemplo de reaproveitamento de código - Linhas 61 à 65 - Com esse reaproveitamento posso garantir uma mensagem de retorno a minha requisição caso não seja encontrado nenhum usuário cadastrado no BD
  }

  try {
    await Cliente.deleteOne({ _id: id }); // Iniciando a configuração para deletar usuário

    resposta.status(200).json({ mensagem: "Usuário deltado com sucesso!" });
  } catch (erro) {
    resposta.status(500).json({ erro: erro });
  }
});

// Exportando router

module.exports = router;
