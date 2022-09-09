const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v2';

axios.defaults.headers.origin = 'http://localhost:4000';
const request = async(req,api)=>{
    try{
        if(!req.session.jwt){
            const tokenResult = await axios.post(`${URL}/token`,{
                clientSecret: process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token;
        }
        return await axios.get(`${URL}${api}`,{
            headers:{authorization:req.session.jwt},
        });
    }catch(error){
        if(error.response.status===419){ //토큰 만료 시 재발급 받기
            delete req.session.jwt;
            return request(req,api);
        }
        return error.response;
    }
};

router.get('/mypost', async(req,res,next)=>{
    try{
        const result = await request(req, '/posts/my');
        res.json(result.data);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/search/:hashtag', async(req,res,next)=>{
    try{
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        );
        console.log(`${req.method} ${req.url} 요청입니다`);
        res.json(result.data);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/', (req,res)=>{
    res.render('main', {key: process.env.CLIENT_SECRET});
});

module.exports = router;