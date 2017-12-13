var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    _id: mongoose.Schema.Types.ObjectId,
    username:  {
        type: String,
        lowercase: true
    },
    password: String,
    email: String,
    data: String
});