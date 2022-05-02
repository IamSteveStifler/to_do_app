const mongoose = require('mongoose');

const regSchema = mongoose.Schema({   
    username : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String
    }
}, {collection : "users"});
module.exports = mongoose.model('Users',regSchema);