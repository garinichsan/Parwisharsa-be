var mongoose = require('mongoose');

// Setup schema
var objekSchema = mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    harga: Number,
    create_date: {
        type: Date,
        default: Date.now
    },
    user_id: String
});

// Export Objek model
var Objek = module.exports = mongoose.model('objek', objekSchema);
module.exports.get = function (callback, limit) {
    Objek.find(callback).limit(limit);
}