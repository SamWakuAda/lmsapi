//import modiles
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const { JWT_SECRET } = process.env;

const { REFRESH_TOKEN_SECRET } = process.env;

//user schema
const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: false
    },
    password:{
        type: String,
        required: true
    },
    token: {
        type: String
    },
    refreshToken: {
        type: String
    },
    date: {
        type: Date,
        default:Date.now
    }
});

//middleware funtion generating the token expiry time
userSchema.methods.generateAuthToken = function () {
    const User = this;
    const secrect = JWT_SECRET;
    const token = jwt.sign({_id: User._id}, secrect, {
        expiresIn: '2m',
    });  
    User.token = token;
}

//middleware function to refresh a token 5m
userSchema.methods.generaRefreshToken = function () {
    const User = this;
    const secrect = REFRESH_TOKEN_SECRET;
    const refreshToken = jwt.sign({_id: User._id }, secrect, {
        expiresIn: '5m',
    },);
    User.refreshToken = refreshToken;
}

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;