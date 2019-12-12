import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

// import { item, Icon, cloud, CardTitle, Textarea,ProgressBar, Container, SideNav, SideNavItem, MediaBox, Row, Col, Card, Button, Table, Select, Collection, CollectionItem } from 'react-materialize';

import { FaUserEdit ,FaFolder} from "react-icons/fa";
// import { FaUserEdit ,FaFolder,IoMdFolderOpen} from "react-icons/IoIoS";
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class Dashboard extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: localStorage.getItem('user'),
            password: "",
            authFlag: false,
            error_message: ""
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);


                // this.props.authUser(response.data);
                this.setState({
                    authFlag: true,
                    error_message: "the username or password is wrong"
                })

            });
    }




    render() {
        // redirect based on successful login
        let redirectVar = null;
        if (!localStorage.getItem('user')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
<div>
{redirectVar}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Navigation email={this.state.email}/>
                    </div>
                    <div className="col-md-9">

                        <div className="row top_100">

                            <div className="col-md-4">
                            <Link to="/Profile"> 
                                <div className="card_outer">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="color_background">
                                                <span className="icons_size">   < FaUserEdit /></span>
                                            </div>
                                        </div>

                                        <div className="col-md-8">
                                            <h3 className="center top_10">Profile</h3>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                            <Link to="/Repositories"> 
                                <div className="card_outer">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="color_background">
                                                <span className="icons_size">   < FaFolder /></span>
                                            </div>
                                        </div>

                                        <div className="col-md-8">
                                            <h3 className="center top_10">Repositories</h3>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                            <Link to="/Testers"> 
                                <div className="card_outer">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="color_background">
                                                <span className="icons_size">   < FaFolder /></span>
                                            </div>
                                        </div>

                                        <div className="col-md-8">
                                            <h3 className="center top_10">All Testers</h3>
                                         </div>
                                    </div>
                                </div>
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
           
            </div>
</div>
        )
    }
}


export default Dashboard;