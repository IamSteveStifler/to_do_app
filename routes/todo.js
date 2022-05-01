const express = require('express');
const tasks = require('../models/to_do_list');
const jwt = require('jsonwebtoken');
const { contentType } = require('express/lib/response');
const router = express.Router();
const JWT_SECRET = "dshjasodaijsdo;d;am8uopqsjdxh8aqenyjqwi8heqi7ehqwil7exiqwyeg"

router.post('/',async (req,res)=>{
    const {token, task} = req.body;
    try{
        const user = await jwt.verify(token,JWT_SECRET);
        const userId = user.username;
        const result =  await tasks.create({
            userId,
            task
        })
      //  console.log(result);
        return res.json({
            status : 'ok',
            data : result
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            status : 'error',
            error : 'token signature not mathced'
        })
    }   
})
router.get('/',async (req,res)=>{
    const {token} = req.body;
    try{
        const user = await jwt.verify(token,JWT_SECRET);
        const userId = user.username;
        const result = await tasks.find({userId})
        if(result.length == 0 ){
            return res.json({
                status : 'error',
                error : 'no records found'
            })
        }
        else{
            return res.json({
                status : 'ok',
                data : result,
                count : result.length
            })
        }
    }catch(error){
        console.log(JSON.stringify(error));
        return res.json({
            status : 'error',
            error : 'token signature is not matched'
        })
    }

});
router.delete('/',async (req,res)=>{
    const {token , _id} = req.body;
    try{
        const user = await jwt.verify(token,JWT_SECRET);
        const result = await tasks.deleteOne({ 
            userId : user.username,
            _id
        });
        if(result.deletedCount == 0){
            return res.json({
                status : "error",
                error: "the item not found to delete"
            })
        }
        return res.json({
            status : "ok",
            data : result
        })
    }catch(error){
        console.log(JSON.stringify(error));
        return res.json({
            status : 'error',
            error : JSON.stringify(error)
        })
    } 
});
router.patch('/', async (req,res)=>{
    const {token, _id, task} = req.body;
    try{
        const user = await jwt.verify(token,JWT_SECRET);
        const result = await tasks.updateOne({
            userId : user.username,
            _id
        },
        {
            $set : {task}
        })
        if(result.modifiedCount == 0){
            return res.json({
                status : "error",
                error : "Not found the task"
            })
        }
        else{
             return res.json({
                status : 'ok',
                data : result
            })
        }
    }catch(error){
        console.log(JSON.stringify(result));
        return res.json({
            status : "error",
            error : error
        })
    }
});
module.exports = router;  