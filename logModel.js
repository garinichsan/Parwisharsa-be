var mongoose = require('mongoose');

// Setup schema
var logSchema = mongoose.Schema({
    action: String,
    status: String,
    target: String,
    data: Object,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
var Log = module.exports = mongoose.model('log', logSchema);
module.exports.get = function (callback, limit) {
    Log.find(callback).limit(limit);
}