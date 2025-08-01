const express = require('express');
const router = express.Router();


router.get('/home', (req, res) => {
    res.render('guest');
})

router.get('/play', (req, res) => {
  res.render('index', { title: "Chess Game" });
});

module.exports = router;
