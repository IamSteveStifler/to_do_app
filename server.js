const dotenv = require('dotenv');
const app = require('./backend/app');
const mongoose = require('mongoose');
dotenv.config({path : './config.env'});
mongoose.connect(process.env.DB)
    .then(err=>{
        console.log('connection succesfull');
    })

    app.listen(process.config.PORT,()=>{
        console.log('server is live');
    })