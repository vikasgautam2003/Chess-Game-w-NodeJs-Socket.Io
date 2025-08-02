const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function attachUsername(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    req.username = `Guest${Math.floor(Math.random() * 100000)}`;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username || `Guest${Math.floor(Math.random() * 100000)}`;
  } catch (err) {
    req.username = `Guest${Math.floor(Math.random() * 100000)}`;
  }

  next();
}

module.exports = attachUsername;
