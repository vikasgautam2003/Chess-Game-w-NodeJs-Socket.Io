const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  fen: { type: String, required: true },
  whitePlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  blackPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  result: { type: String, enum: ['1-0', '0-1', '1/2-1/2', 'ongoing'], default: 'ongoing' },
  moves: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
