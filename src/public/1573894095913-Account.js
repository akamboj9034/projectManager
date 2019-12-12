import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaImage,FaCheck } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import axios from 'axios';


import {connect} from 'react-redux';
import {profile} from './actions/index';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';


 class Account extends Component{
constructor()
{

super();
this.state={
    username : "",
    user_type: "",
    email: "",
    profile_image: "",
    phone: "",
    about_me: "",
    city: "",
    country: "",
    company: "",
    school: "",
    hometown: "",
    languages: "",
    gender: "",
    authFlag: false,
    file: null,
    image_name:"",
    acknowledge:""
}

this.onFormSubmi = this.onFormSubmi.bind(this);
this.onChange = this.onChange.bind(this);
}

componentDidMount(){


    axios.get('http://localhost:3001/account',{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
    .then((response) => {
    //update the state with the response data
  
response.data.map(item =>{

this.setState({

username: item.username,
user_type: item.user_type,
email: item.email,
profile_image: item.profile_image,
phone: item.phone,
about_me: item.about_me,
city: item.city,
country: item.country,
company: item.company,
school: item.school,
hometown: item.hometown,
languages: item.languages,
gender: item.gender

})
})
// this.props.profile(response.data);
});
}
   
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

            //phone change handler to update state variable with the text entered by the user
            phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }
        //about_me change handler to update state variable with the text entered by the user
        about_meChangeHandler = (e) => {
            this.setState({
                about_me : e.target.value
            })
        }
            //city change handler to update state variable with the text entered by the user
            cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }
        //country change handler to update state variable with the text entered by the user
        countryChangeHandler = (e) => {
            this.setState({
                country : e.target.value
            })
        }
            //company change handler to update state variable with the text entered by the user
            companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }
        //school change handler to update state variable with the text entered by the user
        schoolChangeHandler = (e) => {
            this.setState({
                school : e.target.value
            })
        }
            //hometown change handler to update state variable with the text entered by the user
            hometownChangeHandler = (e) => {
        this.setState({
            hometown : e.target.value
        })
    }
        //languages change handler to update state variable with the text entered by the user
        languagesChangeHandler = (e) => {
            this.setState({
                languages : e.target.value
            })
        }
            //gender change handler to update state variable with the text entered by the user
            genderChangeHandler = (e) => {
        this.setState({
            gender : e.target.value
        })
    }


    submitUpdate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            gender : this.state.gender,
            user_type : this.state.user_type,
            email: this.state.email,
            phone: this.state.phone,
            about_me: this.state.about_me,
            city: this.state.city,
            country: this.state.country,
            company: this.state.company,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages
            

        }
  
        //set the with credentials to true
        axios.defaults.withCredentials = true;
  
        //make a post request with the user data
        axios.post('http://localhost:3001/updateAccount',data,{headers: {'Authorization': localStorage.getItem('token')}})
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                     this.props.profile(response.data);
                    this.setState({
                        authFlag : true,
                        acknowledge:"Profile is updated"
                    })
                    
                  
                }else{
                    this.setState({
                        authFlag : false
                    })
                    alert(" not updated. there is some error");
                }
            });
      }
      
      onFormSubmi(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('dp',this.state.file);
        formData.append('image_name',this.state.file.name);
        formData.append('username',this.state.username);
  
     


        axios.post("http://localhost:3001/dp",formData,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
            .then((response) => {
            //    this.props.profile(response.data);
                this.setState({
                    profile_image:this.state.file.name
                })
            });
    }




    onChange(e) {
        this.setState({file:e.target.files[0]});
 
    }

    render(){
   
           //redirect based on successful login
           let redirectVar = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if(!localStorage.getItem('user_type'))
        {
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            
            <div>
            {redirectVar}
            <Navbar/>

        <div class="side_navigation">

            <div class="row">
                <div class="col-md-2 col-sm-2">
                   
                <Sidenavbar/>
                </div>
                <div class="col-md-10 col-sm-10">
               
                <div class="row">
                <div class="col-md-6 col-sm-6">

                <img src={"http://localhost:3000/web/"+this.state.profile_image}  className="img-circle" height="150" width="150" alt="no file"/>
                <br/>
                <form onSubmit={this.onFormSubmi}>

                <label for="upload">
      Change image <FaImage/>
      <input type="file" name="dp" id="upload" onChange= {this.onChange} />
</label>&nbsp;&nbsp;&nbsp;&nbsp;
               
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>



<br/>
                        <div class="form-group ">
                        <label for="username">Username:</label>
                                        <input  type="text" class="form-control" onChange = {this.usernameChangeHandler}  name="username" value={this.state.username} disabled title="sorry, you cannot change your username"/>
                        </div>

                        <div class="form-group">
                        <label for="email">Email:</label>
                                        <input  type="text" class="form-control" onChange = {this.emailChangeHandler}  name="email"  value={this.state.email}  />
                        </div>
                        <div class="form-group">
                        <label for="user_type">User Type:</label>
                                        <input  type="text" class="form-control"  onChange = {this.user_typeChangeHandler} name="user_type"  value={this.state.user_type} title="sorry, you cannot change your user type"  disabled/>
                        </div>
                        <div class="form-group">
                        <label for="phone">Phone:</label>
                                        <input  type="text" class="form-control" onChange = {this.phoneChangeHandler}  name="phone"  value={this.state.phone}  />
                        </div>

                        <div class="form-group">
                        <label for="about_me">About Me:</label>
                                        <input  type="text" class="form-control"  onChange = {this.about_meChangeHandler} name="about_me"  value={this.state.about_me}  />
                        </div>

                </div>
                <div class="col-md-6 col-sm-6">

          
                        <div class="form-group">
                        <label for="city">City:</label>
                                        <input  type="text" class="form-control"  onChange = {this.cityChangeHandler} name="city"  value={this.state.city}  />
                        </div>
                 


                <div class="form-group">
                        <label for="country">Country:</label>
                                        <input  type="text" class="form-control"  onChange = {this.countryChangeHandler} name="country"  value={this.state.country}  />
                        </div>
                        <div class="form-group">
                        <label for="company">Company:</label>
                                        <input  type="text" class="form-control"  onChange = {this.companyChangeHandler} name="company"  value={this.state.company}  />
                        </div>
                        <div class="form-group">
                        <label for="school">School:</label>
                                        <input  type="text" class="form-control"  onChange = {this.schoolChangeHandler} name="school"  value={this.state.school}  />
                        </div>
                        <div class="form-group">
                        <label for="hometown">Hometown:</label>
                                        <input  type="text" class="form-control"  onChange = {this.hometownChangeHandler} name="hometown"  value={this.state.hometown}  />
                        </div>
                        <div class="form-group">
                        <label for="languages">Languages:</label>
                                        <input  type="text" class="form-control" onChange = {this.languagesChangeHandler}  name="languages"  value={this.state.languages}  />
                        </div>
                        <div class="form-group">
                        <label for="gender">Gender:</label>
                                        <input  type="text" class="form-control"  onChange = {this.genderChangeHandler} name="gender"  value={this.state.gender}  />
                        </div>
                        

                        <div class="form-group">
                        <br/>
                        <button class="btn btn-success full" onClick = {this.submitUpdate}>Update</button>
                        </div>
                        <br/>
                        <p class="acknowledge"> {this.state.acknowledge}</p>
                
                </div>


                </div>


         
               
                </div>
            </div>

        </div>
     </div>
        )

}
}
function mapStateToProps(state){
    return {
        updated_msg: state.updated_msg,
        auth: state.auth
    }
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({profile: profile}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);