var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
    message: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);