const express = require('express');

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.send('Hello, Express');
// });

module.exports = router;

router.get('/',function(req,res,next){
    res.render('index',{title: 'Express'});
    //res.locals.title = 'Express';
    // res.render('index');
});