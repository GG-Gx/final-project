const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const requireAuth = async (req, res, next) => {

  //verfy authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.split(' ')[1];

  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();
    
  }
  catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Request is not authorized' });
  }

}


module.exports = requireAuth;