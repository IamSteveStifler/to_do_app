const express = require('express');
const users = require('../models/registrations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "dshjasodaijsdo;d;am8uopqsjdxh8aqenyjqwi8heqi7ehqwil7exiqwyeg"

const router = express.Router();

router.post('/',async(req,res)=>{
    const {username , password} = req.body;
    try{
    const result = await users.findOne({username}).lean();
    if(!result){
        return res.json({
            status : 'error',
            error : 'wrong username/password'
        })
    }
    if(await bcrypt.compare(password,result.password)==true){
        const token = jwt.sign(
            {
                id : result._id,
                username : result.username
            },
            JWT_SECRET
        )
        res.json({
            status : 'ok',
            data : token
        })
    }
    else{
        return res.json({
           status : 'error',
            error : 'invalid userame/password'
        })
    }
    }catch(error){
        console.log(JSON.stringify(error));
        return res.json({
            status : "error",
            error
        })
    }
})



module.exports = router;