import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios';





 class Signup extends Component { 
    //call the constructor method
    constructor(props){
      //Call the constrictor of Super class i.e The Component
      super(props);
      //maintain the state required for this component
      this.state = {
          name:"",
          email : "",
          password : "",
          // user_type:"",
          authFlag : false,
          error_message:""
      }
      //Bind the handlers to this class
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);

      this.submitSignup = this.submitSignup.bind(this);
  }


      //name change handler to update state variable with the text entered by the user
      nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
      this.setState({
          email : e.target.value
      })
  }
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
      this.setState({
          password : e.target.value
      })
  }


// usertypeChangeHandler = (e) => {
//   this.setState({
//       user_type : e.target.value
//   })
// }

submitSignup = (e) => {
  var headers = new Headers();
  //prevent page from refresh
  e.preventDefault();
  const data = {
    name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      // user_type : this.state.user_type,
  }

  //set the with credentials to true
  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post('http://localhost:3001/signup',data)
      .then(response => {
       
          console.log("Status Code : ",response);
          if(response.data.code == 200){
        
            
              this.setState({
                  authFlag : true,
                error_message:"username already taken"
              })
          }else if (response.data.code == 300)
          { 
            // alert(response.data.username);
            localStorage.setItem("user",response.data.username);
            this.setState({
              authFlag : true,
         
          })
          }else{
              this.setState({
                  authFlag : false
              })
          }
      });
}



  render() {
                 //redirect based on successful login
                 let redirectVar = null;
                 if(localStorage.getItem('user')){
                     redirectVar = <Redirect to= "/dashboard"/>
                 }
    return (

      <div>
      {redirectVar}
  <div className="container-fluid">

  <div className="row">
  <div className="col-md-4">
  </div>
      <div className="col-md-4">
      <br/>
                <br/>
                <br/>
<div className="login-box">

<h2 className="center">Mobile Testing Application</h2>                                          <hr/>
                                          
                                  <h6 className="center">Sign Up</h6>
                                  <br/>
                                  <div className="form-group">
                            <input onChange = {this.nameChangeHandler} type="text" className="form-control" name="name" placeholder="Name"/>
                    </div>
                    <div className="form-group">
                            <input onChange = {this.emailChangeHandler} type="text" className="form-control" name="email" placeholder="Email"/>
                    </div>

                    <div className="form-group">
                            <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                    </div>

     
                          
                      <button onClick = {this.submitSignup} className="btn btn-primary full">Sign up</button> 
                      <br/>   <br/> 
                            <p className="error_message">{this.state.error_message}</p>
                          
                      
                      <br/>
                      <Link to="/login">Already have an account? Login here</Link>
</div>


      </div>
      <div className="col-md-4">





      </div>

  </div>









  </div>
  </div>
    );
  }
}



export default Signup;