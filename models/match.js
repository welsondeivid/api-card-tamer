const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  won: Boolean,
  playerName: String,
  cardsPlayed: [String]
}, { _id: false });

const matchItemSchema = new mongoose.Schema({
  players: [playerSchema]
}, { _id: false });

const matchSchema = new mongoose.Schema({
  match: [matchItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);