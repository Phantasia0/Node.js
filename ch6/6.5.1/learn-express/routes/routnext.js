const express = require('express');

const router = express.Router();

router.get('/',function(req,res,next){
    next('route');
}, function(req,res,next){
    console.log('실행되지 않습니다');
    next();
}, function(req,res,next){
    console.log('실행되지 않습니다');
    next();
});

router.get('/', function(req,res){
    console.log('실행됩니다');
    res.send('Hello, Express');
});

module.exports = router;