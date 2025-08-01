const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


router.get('/signup', (req, res) => {
  res.render('signup');
});


router.get('/login', (req, res) => {
    res.render('login', { error: null });
});




router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/user/home');
  } catch {
    res.status(500).send('Server error');
  }
});

// Handle Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/user/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Handle Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
