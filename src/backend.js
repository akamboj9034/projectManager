var express = require('express');
var app = express();
var router=express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');


var cookieParser = require('cookie-parser');
app.use(cookieParser());
var cookies=require('cookies');
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const bcrypt = require('bcrypt');
const saltRounds = 10;


const path = require('path');
const fs = require('fs');

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
  }));
  
  app.use(bodyParser.json());


  const User =require('./models/user_model');
  const Repo =require('./models/repository_model');
  const Assignment =require('./models/assignment_model');
  const Files =require('./models/files_model');
//   const Feedback =require('./models/feedback_model');
//   const Schedule =require('./models/schedule_model');
var multer = require('multer')

  const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://amit:ammy9034@fifa-5mnge.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true ,useUnifiedTopology: true })
.then(result => {
  console.log("connected to mongo");
})
.catch(err =>{
  console.log("not connected to mongo");
  console.log(err);
});



app.post('/upload',function(req, res) {
     console.log("inside upload");

     console.log("repo ID is"+req.query.repoId);
   
     var storage = multer.diskStorage({
      destination: function (req, file, cb) {

     
        if (!fs.existsSync('../public/uploads/'+req.query.repoId)){
          fs.mkdirSync('../public/uploads/'+req.query.repoId);
      }
      cb(null, '../public/uploads/'+req.query.repoId)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
    })
    
    
    var upload = multer({ storage: storage }).array('file')
    

  upload(req, res, function (err) {
    
         if (err instanceof multer.MulterError) {
          console.log(err);
             return res.status(500).json(err)
         } else if (err) {
           console.log(err);
             return res.status(500).json(err)
         }  
         




        //  const file=new Files({

        //   _id: new mongoose.Types.ObjectId(),
        //   fileName:req.body.email,
        //   repo:req.body.name,
        //   created_by:hash,
        //   created_at:""

        // });
        // file.save().then(resul =>{
        //   console.log("file added");
 
        // })
        // .catch(err => {
        //   console.log(err);
        
        // });
    return res.status(200).send(req.file)
  })

});


app.post('/login',function(req,res){

    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
  
    User.findOne({email:req.body.email},function(err,doc){  
      if(doc)
      {
  
        console.log("doc found");
        
        bcrypt.compare(req.body.password, doc.password, function(err, res1) {
          // res == true
  
          if(res1==true){
            res.cookie('email',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('user_type',doc.user_type,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(doc));
    console.log("logged in");
    // console.log( doc.user_type);
    console.log(req.session.user);
    // console.log(req.session.id);
          }
          else{
            
    console.log("incorrect password");
            res.send({
              "code":204,
              "success":"Email and password does not match"
                });
          }
  
      });
  
      }else{
  
        console.log("No user found");
        res.send("no user");
      }
  
  
    });
});



app.post('/signup',function(req,res){

  console.log("Inside Signup Post Request");
  console.log("Req Body : ",req.body);

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          const user=new User({

            _id: new mongoose.Types.ObjectId(),
            email:req.body.email,
            name:req.body.name,
            password:hash,
            user_type:"",
            phone:"",
            about_me:"",
            city:"",
            country:"",
            company:"",
            profile_image:""


          });
          user.save().then(resul =>{
            console.log(resul);

            res.cookie('email',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            res.send({
              "code":300,
              "username":req.body.email
                });

          })
          .catch(err => {
            console.log(err);
            res.send({
              "code":200,
              "success":"user already exists"
                });
          
          });

  console.log("user inserted in table");

        });
});


app.get('/get_profile_data',function(req,res){

  console.log("Inside get profile data Request");
  console.log("Req Body : ",req.query.user);
  User.findOne({email:req.query.user},function(err,doc){  
    if(doc)
    {
console.log(doc);
res.send(doc);
    }
  });


});



app.post('/update_profile',function(req,res){

  console.log("Inside update profile data Request");



  User.update({email:req.body.email},{ $set:{name:req.body.name,phone:req.body.phone,about_me:req.body.about_me,city:req.body.city,country:req.body.country,company:req.body.company} }).exec()
  .then(result=>{
    console.log("mongo: ",result);
    res.send({
      "code":300,
      "message":"profile updated"
        });

  })
  .catch(err => {
  
    console.log(err);
    res.send({
      "code":200,
      "message":"some error"
        });
    // callback(err, null);
  });

});



app.post('/add_repository',function(req,res){

  console.log("Inside add repo Post Request");
  console.log("Req Body : ",req.body);

var date=new Date();
          // Store hash in your password DB.
          const repo=new Repo({

            _id: new mongoose.Types.ObjectId(),
            repoName:req.body.repoName,
            repoDescription:req.body.repoDescription,
            created_by:req.body.created_by,
            created_at:date,
            assigned:false,
            assigned_to:new mongoose.Types.ObjectId()


          });
          repo.save().then(resul =>{
            console.log(resul);

        
            res.send({
              "code":300,
              "message":"repo added"
                });

          })
          .catch(err => {
            console.log(err);
            res.send({
              "code":200,
              "message":"error"
                });
          
          });

  console.log("user inserted in table");


});



app.get('/get_repo_data',function(req,res){

  console.log("Inside get repo data Request");
  console.log("Req Body : ",req.query.user);

  Repo.find({created_by:req.query.user},function(err,doc){  
    if(doc)
    {

      console.log("doc found");
      console.log(doc);
      res.send(doc);
     
        // res == true

// res.send(doc);


    }else{

      console.log("No user found");
      res.send("no user");
    }


  });
});



app.get('/get_tester_data',function(req,res){

  console.log("Inside get tester data Request");
  console.log("Req Body : ",req.query.user);

  User.find({user_type:"tester"},function(err,doc){  
    if(doc)
    {

      console.log("doc found");
      console.log(doc);
      res.send(doc);
     
        // res == true

// res.send(doc);


    }else{

      console.log("No user found");
      res.send("no user");
    }


  });
});



app.post('/assign_tester',function(req,res){

  console.log("Inside assign tester Post Request");
  console.log("Req Body : ",req.body);

var date=new Date();
          // Store hash in your password DB.
          const assignment=new Assignment({

            _id: new mongoose.Types.ObjectId(),
            repo:req.body.repo,
            tester:req.body.tester,
            assigned_by:req.body.assigned_by,
            assigned_at:date


          });
          assignment.save().then(resul =>{
            console.log(resul);
            //updating the assignment status of repo
            Repo.update({_id:req.body.repo},{ $set:{assigned:true,assigned_to:req.body.tester} }).exec()
            .then(result=>{
              console.log("assignment status updated");
     
            })
            .catch(err => {
              console.log("assignment status not updated");
              console.log(err);
      
            });
        
            res.send({
              "code":300,
              "message":"assignment added"
                });

          })
          .catch(err => {
            console.log(err);
            res.send({
              "code":200,
              "message":"error"
                });
          
          });




});




app.post('/remove_repo',function(req,res){

  console.log("Inside get tester data Request");
  console.log("Req Body : ",req.body.repo);

  Repo.remove({_id:req.body.repo},function(err,doc){  
    if(doc)
    {

      console.log("doc found and deleted");
      Assignment.remove({repo:req.body.repo},function(err,doc){  
        if(doc)
        {
    
          console.log("assignmentdeleted");
  
        }else{
    
          console.log("No assignment found");
          // res.send("no user");
        }
      res.send("deleted");
      })
        // res == true

// res.send(doc);


    }else{

      console.log("No doc found");
      // res.send("no user");
    }


  });
});


app.get('/Show_repo/:repo',function(req,res){

  console.log("Inside get show repo data Request");
  console.log("Req Body : ",req.params.repo);

  var result=[];
  Repo.find({_id :req.params.repo})
  .populate('assigned_to')
  .exec(function (err3, alldata3) {

     console.log(alldata3);
   
  // res.send(alldata3); 



  const directoryPath = path.join(__dirname, '../public/uploads/'+req.params.repo);
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 

     
      var i=0;
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file); 
          result[i]=file;
          i++;
      });
      var send={
        repoData:alldata3,
        fileData:result
      }
      // console.log(send.repoData[0].assigned_to);
            res.send(send);
    

  });

});
});



app.get('/Show_profile/:user',function(req,res){

  console.log("Inside get show profile Request");
  console.log("Req Body : ",req.params.user);

  User.find({_id:req.params.user},function(err,doc){  
    if(doc)
    {

      console.log("doc found");
      console.log(doc);
      res.send(doc);

    }else{

      console.log("No user found");
      res.send("no user");
    }


  });


});
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;


