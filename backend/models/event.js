const mongoose = require('mongoose');
const eventSchema = mongoose.Schema ({
    title: { type: String, required: true},
    date: { type: Date, required: true},
    description: { type: String, required: true}
})
module.exports = mongoose.model('event', eventSchema);

//bucket Schema
// const bucketScehma = mongoose.Schema ({
//     category: { type: String, required: true},
//     price: { type: String, required: true},
//     condition: { type: String, required: true},
//     agreement: { type: String, required: true},
//     image: { type: String, required: true}
// })
// const bucket = mongoose.Schema('bucket', bucketScehma);
// module.exports = bucket;