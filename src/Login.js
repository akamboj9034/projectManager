import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

// import {connect} from 'react-redux';
// import {authUser} from './actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            error_message:""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
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
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data.code == 200){

                    this.setState({
                        authFlag : true,
                    error_message:"the username or password is wrong"
                    })
                }else{
                    localStorage.setItem("user",this.state.email);
                    this.setState({
                        authFlag : true
                    })
                }
                
                    // this.props.authUser(response.data);
           
                
            });
    }

    render(){
       // redirect based on successful login
        let redirectVar = null;
        if(localStorage.getItem('user')){
            redirectVar = <Redirect to= "/dashboard"/>
        }
        return(
        <div className="container-fluid">
                {redirectVar}
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                <br/>
                <br/>
                <br/>
                    <div className="login-box">


                    <h2 className="center">Mobile Testing Application</h2>         
                        <hr/>
                        
                <h6 className="center">Login</h6>
                <br/>
                            <div className="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" className="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} className="btn btn-primary full">Login</button>    
                            <br/>
                            <br/>
                            <p className="error_message">{this.state.error_message}</p>
                            <br/>
                            <Link to="/signup">No account? Signup here</Link>

                    </div>
                </div>
                <div className="col-md-4">
                </div>
             

            </div>
        </div>

        )
    }
}


export default Login;