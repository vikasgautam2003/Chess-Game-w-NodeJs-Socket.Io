const express = require('express')
const router = express.Router();


function generateGuestName() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `Guest${randomNum}`;
}


router.get('/home', (req, res) => {
  const guestName = generateGuestName();

  
  res.cookie('guestName', guestName, {
    httpOnly: false,
    maxAge: 2000 * 60 * 60 * 1000 
  });

  res.render('guest', { username: guestName });
});


router.get('/play', (req, res) => {
  const guestName = req.cookies.guestName || 'Guest';
  res.render('index', { title: "Chess Game", username: guestName });
});



module.exports = router;
