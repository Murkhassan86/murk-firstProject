const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const userInfo = mongoose.Schema({
   firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    country: { type: String, required: true},
    birthDate: { type: Date, required: true},
})

//plugin uniqueValidator 
// signUpSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userInfo', userInfo);