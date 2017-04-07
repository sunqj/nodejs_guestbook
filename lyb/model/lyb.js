var mongoose = require("mongoose");

var Lyb = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    email: { type:String,default:''},
    content: { type:String },
    phone: { type:String }
});

module.exports = Lyb;