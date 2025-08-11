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


router.get('/snake', (req, res) => {
  if (req.user && req.user.username) {
    
    res.render('snake', {
      username: req.user.username,
      isGuest: false,
      title: 'Snake Game - Bonzo'
    });
  } else {
   
    res.render('snake', {
      username: 'Guest' + Math.floor(1000 + Math.random() * 9000),
      isGuest: true,
      title: 'Snake Game - Bonzo'
    });
  }
});

module.exports = router;

