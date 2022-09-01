const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hello, User');
});

router.get('/',function(req,res,next){
    
})

module.exports = router;