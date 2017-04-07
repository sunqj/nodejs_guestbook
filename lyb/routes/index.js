
var express = require('express');
var router = express.Router();
//var mongoose = require('./mongoosedb');
var lyb = require('../model/lyb.js');

var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/sunqj");

/* GET home page. */
router.get('/', function(req, res, next) {

  var lybmodel = mongoose.model("lybs",lyb);
  var lists = null;
  lybmodel.find({},function(err,docs){

    if(err)
      console.log('error:'+err);
    else{
      lists = docs;
      res.render('index', { title: 'Express' ,lists:lists});
    }

  });

});


router.get('/delete',function(req,res,next){

  var did = req.query.id;
  var conditions = {_id:did};

  var lybmodel = mongoose.model("lybs",lyb);
  lybmodel.remove(conditions,function(err){
    res.redirect('/');

  });

});

//编辑
router.get('/edit',function(req,res,next){
  var eid = req.query.id;

  var lybmodel = mongoose.model("lybs",lyb);
  lybmodel.findOne({_id:eid},function(err,docs){

        res.render('edit', { id:eid, lists:[docs] });

  });
});

router.post('/edit',function(req,res,next){
  var id = req.body.id;
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var phone = req.body.phone;
  var content = req.body.content;

  var conditions = {_id:id};
  var update = {$set:{name:name,age:age,email:email,phone:phone,content:content}};

  var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    email: { type:String,default:''},
    content: { type:String },
    phone: { type:String }
  });

  var TestModel ;
  try {
    TestModel = mongoose.model("lyb" );
  } catch (error) {
    TestModel = mongoose.model("lyb", TestSchema );
  }

  TestModel.update(conditions,update,function(err){
    res.redirect('/')
  });


});


router.get('/add',function(req,res,next){


  res.render('add',{title: '添加' });

});

router.post('/add',function(req,res,next){
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var phone = req.body.phone;
  var content = req.body.content;

  var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    email: { type:String,default:''},
    content: { type:String },
    phone: { type:String }
  });
  var TestModel = mongoose.model("lyb", TestSchema );

  var TestEntity = new TestModel({
    name : name,
    age  : age,
    email: email,
    content: content,
    phone: phone
  });
  TestEntity.save(function(error,doc){
    if(error){
      console.log("error :" + error);
    }else{
      res.redirect('/');
    }
  });


});

router.get('/createcolln',function(req,res,next){

  var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    email: { type:String,default:''},
    content: { type:String },
    phone: { type:String }
  });
  var TestModel = mongoose.model("lyb", TestSchema );
  var TestEntity = new TestModel({
    name : "helloworld",
    age  : 28,
    email: "helloworld@qq.com",
    content:"ok",
    phone: "18629363035"
  });
  TestEntity.save(function(error,doc){
    if(error){
      console.log("error :" + error);
    }else{
      console.log(doc);
    }
  });

});

module.exports = router;
