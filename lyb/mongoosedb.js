var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/sunqj");
module.exports = mongoose;