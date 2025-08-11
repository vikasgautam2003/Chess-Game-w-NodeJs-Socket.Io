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
