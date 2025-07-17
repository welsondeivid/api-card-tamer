const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  deckName: { type: String, required: true },
  cardNames: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'cards não pode ser vazio']
  }
}, { timestamps: true });

module.exports = mongoose.model('Deck', deckSchema);
