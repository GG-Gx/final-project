const User = require('../Models/userModel'); // Ensure correct path

const bcrypt = require('bcryptjs');


// login user
const loginUser = async (req, res) => {
    console.log('login route hit');
    try {
        const { email, password } = req.body;
        console.log('email:', email);
        console.log('password hash:', password  );  // Ensure correct password hash
        const user = await  User.findOne
        ({ email: email });
        if (!user) {
            return res.status(400).send('User not found');
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        res.status(200).send('Login successful');
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }

};

// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signupUser(email, password);

    res.status(200).send({email, user});
  } catch (error) {

    console.error('Error signing up:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
