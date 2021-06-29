const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const signUpSchema = Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    city: { type: String, required: true},
    address: { type: String, required: true},
    role: {type: String, required: true}
})

//plugin uniqueValidator 
signUpSchema.plugin(uniqueValidator);

// const bucketSchema = Schema({
//     category: { type: String, required: true},
//     price: { type: String, required: true},
//     condition: { type: String, required: true},
//     agreement: { type: String, required: true},
//     image: { type: String, required: true},
//      UserId: { type: Schema.Types.ObjectId, ref: 'signUp'}
// })

const signUp = mongoose.model('signUp', signUpSchema);
module.exports = signUp;
// const bucket = mongoose.model('bucket', bucketSchema);
// module.exports = bucket;