const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    fullName: {type: String, required: true},
    province: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    provinceName: { type: String, required: true},
    email: { type: String},
    address: { type: String, required: true},
    proceed: { type: String },
    status: { type: String},
    bucketId: { type: mongoose.Schema.Types.ObjectId, ref: 'bucket' }
})
const deliveryInfo = mongoose.model('deliveryInfo', deliverySchema);

module.exports = deliveryInfo;