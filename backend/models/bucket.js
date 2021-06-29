const mongoose = require('mongoose');
const bucketSchema = mongoose.Schema ({
    category: { type: String, required: true},
    price: { type: String, required: true},
    size: { type: String},
    color: { type: String, required: true},
   fabric: { type: String},
   age: { type: String},
   description: { type: String, required: true},
    agreement: { type: String, required: true},
    image: { type: String, required: true},
    status: { type: String, required: true},
    createdAt: { type: String, required: true},
    bucketIndex: { type: String, required: true},
    reason: {type: String},
    // delivery info
    fullName: {type: String},
    province: { type: String},
    phoneNumber: { type: Number},
    provinceName: { type: String},
    email: { type: String},
    address: { type: String},
    proceed: { type: String },

    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'signUp'},

})
const bucket = mongoose.model('bucket', bucketSchema);

module.exports = bucket;
    