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
    console.log('signup route hit');
    try {
        const { email, password } = req.body;
        console.log('email:', email);
        console.log('password, hash:', password);
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(200).send('Signup successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { loginUser, signupUser };
