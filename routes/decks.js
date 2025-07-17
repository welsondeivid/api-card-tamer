const express = require('express');
const router = express.Router();
const Deck = require('../models/deck');

// Criar um único deck
router.post('/', async (req, res) => {
  try {
    const { deckName, cardNames } = req.body;

    if (typeof deckName !== 'string' || !Array.isArray(cardNames) || cardNames.length === 0) {
      return res.status(400).json({ erro: 'Formato inválido. Esperado: deck_name (string) e cards (array não vazio)' });
    }

    const novoDeck = new Deck({ deckName, cardNames });
    await novoDeck.validate();
    const salvo = await novoDeck.save();

    res.status(201).json(salvo);
  } catch (err) {
    console.error('Erro ao criar deck:', err);
    res.status(500).json({ erro: 'Erro ao criar deck', detalhes: err.message });
  }
});

// Buscar todos os decks
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    res.json({ decks });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar decks', detalhes: err.message });
  }
});

module.exports = router;
