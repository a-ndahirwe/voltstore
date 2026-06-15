const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAdmin = async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization || req.headers.Authorization;

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'voltstore_secret');
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Admin auth error:', err.message);
    res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};

module.exports = { requireAdmin };