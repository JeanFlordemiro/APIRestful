const mongoose = require("mongoose"); // Importando mongoose

const Cliente = mongoose.model("Cliente", {
  Nome: String,
  Idade: Number,
  Profissão: String,
  Nacionalidade: String,
  Destino: String,
  ClienteAprovado: Boolean,
});

module.exports = Cliente;
