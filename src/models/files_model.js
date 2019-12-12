
var uniqueValidator = require('mongoose-unique-validator');
const mongoose=require('mongoose');

const files_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    fileName:String,
    created_by:String,
    created_at:Date,
    repo:{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'repo_model',
        required: false
    }

});
// user_schema.plugin(uniqueValidator);
module.exports=mongoose.model('files_model',files_schema);