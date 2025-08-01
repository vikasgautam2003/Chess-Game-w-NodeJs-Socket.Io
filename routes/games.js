const express = require('express');
const Game = require('../models/game');
const router = express.Router();


router.get('/recent', async (req, res) => {
  const games = await Game.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('whitePlayer blackPlayer', 'username rating');
  res.json(games);
});


router.get('/active', async (req, res) => {
  const games = await Game.find({ result: 'ongoing' })
    .populate('whitePlayer blackPlayer', 'username rating');
  res.json(games);
});

module.exports = router;
