var mongoose = require('mongoose');

var helpSchema = mongoose.Schema({
    question: String,
    contact: Number
});

module.exports = mongoose.model("Help", helpSchema);