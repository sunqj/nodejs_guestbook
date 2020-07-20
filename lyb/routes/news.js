
var express = require('express');
var router = express.Router();
//var mongoose = require('./mongoosedb');
var lyb = require('../model/lyb.js');

var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/sunqj");

//新闻列表
router.get('/newlist',function(req,res,next){

    res.render('newlist',{title:'新闻列表'})
  
  });