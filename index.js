const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

app.get('/', (req, res) => {
  return res.json({ mensagem: 'API funcionando!' });
});

const matchRoutes = require('./routes/matchs');
app.use('/matchs', matchRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;