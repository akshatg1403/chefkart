const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

const authorizeChef = (req, res, next) => {
  if (req.user.role !== 'CHEF') {
    return res.status(403).json({ error: 'Access denied. Chef role required.' });
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'USER') {
    return res.status(403).json({ error: 'Access denied. User role required.' });
  }
  next();
};

module.exports = { authenticate, authorizeChef, authorizeUser };
