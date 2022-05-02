const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  users = require('../models/registrations');
const JWT_SECRET = "dshjasodaijsdo;d;am8uopqsjdxh8aqenyjqwi8heqi7ehqwil7exiqwyeg"

router.post('/',async(req,res)=>{
    const {token , newPassword} = req.body;
 //   console.log(token);
 //   console.log(newPassword);
    if(!newPassword || typeof(newPassword) !== 'string'){
        return res.json({
            status : 'error',
            error : "Invalid password"
        })
    }
    if(newPassword.length <=5){
        return res.json({
            status :  'error',
            error : "Password too small,  the minimum length should be atleast 6"
        })
    }
    try{
        const user = jwt.verify(token, JWT_SECRET);
        const _id = user.id;
        const hash = await bcrypt.hash(newPassword , 10);
        const result = await users.updateOne(
            { _id },
            {
                $set: {password : hash}
            }
        ).lean();
        //console.log(result);
        res.json({
            status: 'ok',
            data  : result
        }) 
    }catch(error){
     //   console.log(error);
        res.json({
            status : 'error',
            error : 'token not verified correctly'
        })
    }
})
module.exports = router;

