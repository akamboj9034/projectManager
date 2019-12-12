import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

import {Link} from 'react-router-dom';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { item, Textarea,Container,SideNav, SideNavItem, Toast,MediaBox, Row, Col, Card, Button, Table, Select, Collection, CollectionItem } from 'react-materialize';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'materialize-css/dist/css/materialize.min.css';
//Define a Login Component
class Navigation extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
   //handle logout to destroy the cookie
   handleLogout = () => {
     
    localStorage.clear();
}
    render(){

        return(




<div className="side_navigation">

   
           
            <div class="sidenav">
            <img src="http://localhost:3000/images/profile.png" class="img-rounded" alt="Cinque Terre"/>
          <Link to="/dashboard">  Dashboard</Link>
          <Link to="/profile"> Profile</Link>
          <Link to="/"  onClick = {this.handleLogout}>Logout</Link>
   
            </div>
        </div>



        )
    }
}


export default Navigation;