const mongoose = require('mongoose');

const reasonSchema = mongoose.Schema({
    reason: { type: String, required: true},
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'signUp'},
    bucket: { type: mongoose.Schema.Types.ObjectId, ref: 'bucket'}
})

module.exports  = mongoose.model('reason', reasonSchema );
