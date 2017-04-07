var mongoose = require("mongoose");

var interfacetable = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    content: { type:String },
});

module.exports = interfacetable;