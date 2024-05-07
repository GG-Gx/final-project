const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6


    }
}, {
    timestamps: true,
});

 // static method to signup user
userSchema.statics.signupUser = async function (email, password)  {

    //validation
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough');
    }



    const exist = await this.findOne({ email });
    if (exist) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;

};






const User = mongoose.model('User', userSchema);

module.exports = User;