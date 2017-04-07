var express = require('express');
var router = express.Router();

var interfacetable = require('../model/interfacetable.js');

var mongoose = require('mongoose');
//mongoose.connect("mongodb://127.0.0.1:27017/sunqj");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('欢迎使用自助接口列表,<a href="/users/list">查看接口列表</a>');
});

//显示接口列表
router.get('/list',function(req,res,next){

  var facemodel
  try{
    facemodel = mongoose.model("interfacetable");
  } catch(error){
    facemodel = mongoose.model("interfacetable",interfacetable);
  }

  var lists = null;
  facemodel.find({},function(err,docs){

    if(err)
      console.log('error:'+err);
    else{
      lists = docs;
      res.render('list', { title: '接口列表' ,lists:lists});
    }

  });


});


router.get('/listedit',function(req,res,next){

  var eid = req.query.id;

  var facemodel
  try{
    facemodel = mongoose.model("interfacetable");
  } catch(error){
    facemodel = mongoose.model("interfacetable",interfacetable);
  }
  facemodel.findOne({_id:eid},function(err,docs){

    res.render('listedit', { id:eid, lists:[docs] });

  });

});


router.post('/listedit',function(req,res,next){

  var id = req.body.id;
  var name = req.body.name;
  var content = req.body.content;

  var conditions = {_id:id};
  var update = {$set:{name:name,content:content}};

  var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    content: { type:String }
  });

  var TestModel ;
  try {
    TestModel = mongoose.model("interfacetable" );
  } catch (error) {
    TestModel = mongoose.model("interfacetable", TestSchema );
  }

  TestModel.update(conditions,update,function(err){
    res.redirect('/users/list')
  });

});


router.get('/listdelete',function(req,res,next){

  var did = req.query.id;
  var conditions = {_id:did};

  var TestModel = mongoose.model("interfacetable",interfacetable);
  TestModel.remove(conditions,function(err){
    res.redirect('/users/list');

  });

});

router.get('/show',function(req,res,next){

  var id = req.query.id;
  var facemodel
  try{
    facemodel = mongoose.model("interfacetable");
  } catch(error){
    facemodel = mongoose.model("interfacetable",interfacetable);
  }
  facemodel.findOne({_id:id},function(err,docs){

    res.render('show', { id:id, lists:[docs] });

  });


});

//添加接口
router.get('/listadd',function(req,res,next){

  res.render('listadd',{title:'添加接口'})

});


router.post('/listadd',function(req,res,next){

  var name = req.body.name;
  var content = req.body.content;

  var TestSchema = new mongoose.Schema({
    name : { type:String },
    content: { type:String }
  });

  var TestModel
  try{
    TestModel = mongoose.model("interfacetable");
  } catch(error){
    TestModel = mongoose.model("interfacetable",interfacetable);
  }


  var TestEntity = new TestModel({
    name : name,
    content: content,
  });
  TestEntity.save(function(error,doc){
    if(error){
      console.log("error :" + error);
    }else{
      res.redirect('list');
    }
  });


});

router.get('/createtable',function(req,res,next){

  var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    content: { type:String },
  });
  var TestModel = mongoose.model("interfacetable", TestSchema );
  var TestEntity = new TestModel({
    name : "test",
    content:"ok",
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
