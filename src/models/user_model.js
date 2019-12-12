
var uniqueValidator = require('mongoose-unique-validator');
const mongoose=require('mongoose');

const user_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email:{type: String,unique:true},
    name:String,
    password:String,
    user_type:String,
    phone:String,
    about_me:String,
    city:String,
    country:String,
    company:String,
    profile_image:String

});
user_schema.plugin(uniqueValidator);
module.exports=mongoose.model('user_model',user_schema);