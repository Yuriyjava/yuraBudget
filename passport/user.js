var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username:  {
        type: String,
        lowercase: true
    },
    password: String,
    email: String,
    data: String
});