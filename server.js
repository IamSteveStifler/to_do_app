const app = require('./backend/app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_app')
    .then(err=>{
        console.log('connection succesfull');
    })

    app.listen(3000,()=>{
        console.log('server is live');
    })