const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', async (req, res) => {
  try {
    const matchs = await Match.find();
    return res.json(matchs);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar matchs', detalhes: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const novaMatch = new Match(req.body);
    const resultado = await novaMatch.save();
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao salvar partida:', err);
    res.status(400).json({ erro: 'Erro ao salvar partida', detalhes: err });
  }
});

module.exports = router;
