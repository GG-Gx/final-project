const User = require('../Models/userModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};



// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);
    // Create a token
    const token = createToken(user._id);
    res.status(200).json({email, token});
    }
  catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ error: error.message });
  }
}



// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signupUser(email, password);

    // Create a token

    const token = createToken(user._id);

    res.status(200).send({email, token});
  } catch (error) {

    console.error('Error signing up:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
