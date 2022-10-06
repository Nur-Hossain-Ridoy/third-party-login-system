const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pleae provide your name']
    },
    googleId: String,
    email: {
        type: String,
        required: [true, 'Please provide your email']
    },
})

module.exports = mongoose.model('User', userSchema)