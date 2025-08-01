const express = require('express');
const http = require('http');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('homepage', { title: 'Chess Home' });
});

module.exports = router;