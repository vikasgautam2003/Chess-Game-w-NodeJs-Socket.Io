const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.locals.username = decoded.username; // available in EJS
      req.user = decoded; // available in routes
    } catch (err) {
      console.error('JWT Error:', err);
      res.locals.username = null;
    }
  } else {
    res.locals.username = null;
  }

  next();
};
