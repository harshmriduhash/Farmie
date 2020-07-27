var mongoose = require('mongoose');

var farmerSchema = mongoose.Schema({
    username: String,
    password: String,
    contact: Number,
    village: String,
    age: Number
});

module.exports = mongoose.model("Farmer", farmerSchema);