const mongoose = require('mongoose');
const { collection } = require('./registrations');

const listSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    task : {
        type : String,
        required : true
    }
}, 
{collection : "tasks"}
);
module.exports = mongoose.model('tasks', listSchema);
