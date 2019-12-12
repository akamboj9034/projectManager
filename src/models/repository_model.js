
var uniqueValidator = require('mongoose-unique-validator');
const mongoose=require('mongoose');

const repository_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    repoName:String,
    repoDescription:String,
    created_by:String,
    created_at:Date,
    assigned:Boolean,
    assigned_to:{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'user_model',
        required: true
    }

});
// user_schema.plugin(uniqueValidator);
module.exports=mongoose.model('repository_model',repository_schema);