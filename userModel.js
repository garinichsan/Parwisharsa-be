var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    picture: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
userSchema.plugin(findOrCreate);

// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}