const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const users = require('../models/registrations');

const router = express.Router();

router.post('/',async(req,res)=>{
    const {username , password,name} = req.body;
    if( !username || typeof(username)!== 'string'){
        return res.json({
            status : 'error',
            error : 'invalid username'
        })
    }
    if( !password || typeof(password)!=='string'){
        return res.json({
            status : 'error',
            error : 'invalid password'
        })
    }
    if(password.length < 5){
        return res.json({
            status  : 'error',
            error : 'password too small , the length should be atleast 6 characters'
        })
    }
    const hash = await bcrypt.hash(password, 10);   
    try{
        const result = await users.create({
            username : username,
            password : hash,
            name
        })
        console.log(result);
        res.json({
            status : 'ok',
            message : 'the user created successfully'
        })            
    }catch(err){
        if(err.code === 11000){
            return res.json({
                status : 'error',
                error : 'username already exists'
            })
        }
        throw err;   
    }
})
module.exports = router;