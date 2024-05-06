const  express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser } = require('../Controllers/userController.js');


//log in route
router.post('/login', loginUser, async (req, res) => {
    console.log('login route hit');
    try {
        const { email, password } = req.body;
        console.log('email:', email);
        console.log('password:', password);
        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
}
);



//sign up route

router.post('/signup', signupUser, async (req, res) => {
    console.log('signup route hit');
    try {
        const { email, password } = req.body;
        console.log('email:', email);
        console.log('password:', password);
        res.status(200).send('Signup successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal Server Error');
    }
}
);




module.exports = router;
