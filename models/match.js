import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  player: { type: String, required: true },
  cards: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'cards não pode ser vazio']
  }
});

const matchSchema = new mongoose.Schema({
  player_loser: { type: String, required: true },
  players: {
    type: [playerSchema],
    required: true,
    validate: [arr => arr.length > 0, 'players não pode ser vazio']
  }
}, { timestamps: true});

export default mongoose.model('Match', matchSchema);