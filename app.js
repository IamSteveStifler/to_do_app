const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const regRouter = require('./routes/reg');
const loginRouter = require('./routes/login');
const passwordChangeRouter  = require('./routes/chngpsswrd');
const taskRouter = require('./routes/todo');

//middleware
app.use(bodyParser.json());
app.use('/registration',regRouter);
app.use('/login',loginRouter);
app.use('/change-password',passwordChangeRouter);
app.use('/tasks',taskRouter);

//database connection
mongoose.connect('mongodb://localhost/todo_app');

mongoose.connection
    .once('open',()=>{
        console.log('connected to database');
    })
    .on('error',(error)=>{
        console.log(error);
    })


//listen
app.listen(3000,()=>{
    console.log('server is live');
})