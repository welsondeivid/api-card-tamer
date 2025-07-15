const express = require('express');
const router = express.Router();
const Match = require('../models/match').default;

router.get('/', async (req, res) => {
  try {
    const matchs = await Match.find({}, {player_loser: 1, players: 1, _id: 0});
    return res.json(matchs);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar matchs', detalhes: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const novaMatch = new Match(req.body);
    await novaMatch.validate();
    const resultado = await novaMatch.save();
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao salvar partida:', err);
    res.status(400).json({ erro: 'Dados inválidos', detalhes: err.message });
  }
});

module.exports = router;
