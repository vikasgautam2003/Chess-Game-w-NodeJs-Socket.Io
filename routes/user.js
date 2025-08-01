// const express = require('express');
// const router = express.Router();


// router.get('/home', (req, res) => {
//     res.render('user', { username: req.user ? req.user.username : 'Guest' });
// })



// module.exports = router;


const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

router.get('/home', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.render('user', { username: res.locals.username });
});


router.get('/play', (req, res) => {
  const username = req.user ? req.user.username : 'Guest';
  res.render('index', { username });
});

module.exports = router;
