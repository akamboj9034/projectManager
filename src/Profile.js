import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
// import { item, Textarea,Container,SideNav, SideNavItem, Toast,MediaBox, Row, Col, Card, Button, Table, Select, Collection, CollectionItem } from 'react-materialize';

// import {connect} from 'react-redux';
// import {authUser} from './actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

// import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

//Define a Login Component
class Profile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: localStorage.getItem('user'),
            name: "",
            phone: "",
            aboutMe: "",
            city: "",
            userType:"",
            country: "",
            company: "",
            authFlag: false,
            error_message: "",
            userData:[],
            loader:false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.aboutMeChangeHandler = this.aboutMeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
   
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
   
    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }
       
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
   
    aboutMeChangeHandler = (e) => {
        this.setState({
            aboutMe: e.target.value
        })
    }
       
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
   
    countryChangeHandler = (e) => {
        this.setState({
            country: e.target.value
        })
    }
    companyChangeHandler = (e) => {
        this.setState({
            company: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    updateProfile = (e) => {
     
        var headers = new Headers();
       
        e.preventDefault();
        const data = {
            email: this.state.email,
            name: this.state.name,  
             phone: this.state.phone,
            about_me: this.state.aboutMe,
            city: this.state.city,
            country: this.state.country,
            company: this.state.company
        }
        // alert(this.state.city);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/update_profile', data)
            .then(response => {
                console.log("Status Code : ", response.status);


                // this.props.authUser(response.data);
                this.setState({
                    loader:true,
                    authFlag: true,
                    error_message: response.data.message
                })

            });
    }
    componentDidMount(){

        axios.get('http://localhost:3001/get_profile_data',{params:{user:localStorage.getItem('user')}})
                .then((response) => {
                //update the state with the response data
               
                this.setState({
                    userData : this.state.userData.concat(response.data) 
                });
                this.setState({
                    // email : this.state.userData[0].email,
                    name : this.state.userData[0].name,
                    phone : this.state.userData[0].phone,
                    aboutMe : this.state.userData[0].about_me,
                    city : this.state.userData[0].city,
                    country : this.state.userData[0].country,
                    company : this.state.userData[0].company,
                    userType : this.state.userData[0].user_type,


                });
            });
    }
    
    render() {
        // redirect based on successful login
        let redirectVar = null;
    
        if (!localStorage.getItem('user')) {
            redirectVar = <Redirect to="/login" />
        }

        let details = this.state.userData.map(item => {

            return(
<div>


    </div>

            )}
        )
        
        return (
            <div className="container">
                {redirectVar}
        


<div className="row">

                    <div className="col-md-3">
                    <Navigation email={this.state.email}/>
                    </div>
                    <div className="col-md-4 top_100">
                    <label for="email">Email</label>
                        <div className="form-group">
                           
                            <input onChange={this.emailChangeHandler} type="text" className="form-control" name="email" value={this.state.email} placeholder="Email" disabled/>
                        </div>
                        <label for="name">Name</label>
                        <div className="form-group">
                                <input onChange={this.nameChangeHandler} type="text" className="form-control" name="name" placeholder="Name" value={this.state.name} />
                            </div>
                            <label for="userType">User Tyoe</label>
                            <div className="form-group">
                                <input onChange={this.nameChangeHandler} type="text" className="form-control" name="userType" placeholder="User Type" value={this.state.userType} disabled />
                            </div>
                            <label for="phone">Phone</label>
                            <div className="form-group">
                                <input onChange={this.phoneChangeHandler} type="text" className="form-control" name="phone" placeholder="Phone" value={this.state.phone} />
                            </div>
                            <h4 className="confirmation top_10">{this.state.error_message}</h4>
                            

         
                    </div>
                    <div className="col-md-4 top_100">
                    <label for="aboutMe">About Me</label>
                    <div className="form-group">
                                <input onChange={this.aboutMeChangeHandler} type="text" className="form-control" name="aboutMe" placeholder="About Me" value={this.state.aboutMe} />
                            </div>
                            <label for="city">City</label>
                            <div className="form-group">
                                <input onChange={this.cityChangeHandler} type="text" className="form-control" name="city" placeholder="City" value={this.state.city} />
                            </div>
                            <label for="country">Country</label>
                            <div className="form-group">
                                <input onChange={this.countryChangeHandler} type="text" className="form-control" name="country" placeholder="Country" value={this.state.country} />
                            </div>
                            <label for="company">Company</label>
                            <div className="form-group">
                                <input onChange={this.companyChangeHandler} type="text" className="form-control" name="company" placeholder="Company" value={this.state.company} />
                            </div>
                         
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>

             
           <button className="btn btn-success right" onClick={this.updateProfile}>Update</button>
          <div>
         
              </div>
            </div>

        )
    }
}


export default Profile;