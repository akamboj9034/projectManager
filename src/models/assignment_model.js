
var uniqueValidator = require('mongoose-unique-validator');
const mongoose=require('mongoose');

const assignment_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
 
    tester:{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'user_model',
        required: false
    },
    repo:{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'repository_model',
        required: false
    },
    assigned_by:String,
    assigned_at:Date


});
// user_schema.plugin(uniqueValidator);
module.exports=mongoose.model('assignment_model',assignment_schema);