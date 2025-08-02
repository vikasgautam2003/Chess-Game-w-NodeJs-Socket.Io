const express = require('express');
const router = express.Router();
const attachUsername = require('../middlewares/authusername');

router.get('/home', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.render('user', { username: res.locals.username });
});

router.get('/play', attachUsername, (req, res) => {
  const username = req.username;
  res.render('index', { username });
});


module.exports = router;

