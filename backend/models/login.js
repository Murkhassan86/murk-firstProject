const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const LoginSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

//plugin uniqueValidator 
LoginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('login', LoginSchema);