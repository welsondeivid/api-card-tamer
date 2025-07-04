const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rotas
const matchRoutes = require('./routes/matchs');
app.use('/matchs', matchRoutes);

app.get('/', (req, res) => {
  return res.json({ mensagem: 'API funcionando!' });
});

// Conecta no MongoDB e só inicia o servidor se conectar com sucesso
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1); // Encerra o processo se não conectar
  });

module.exports = app;
