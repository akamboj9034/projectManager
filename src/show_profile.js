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
import { Button ,Card} from 'react-bootstrap';
//Define a Login Component
class Testers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: localStorage.getItem('user'),
            password: "",
            authFlag: false,
            error_message: "",
            testerData:[]
        }
        //Bind the handlers to this class

    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    componentDidMount() {

        var last = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1, this.props.location.pathname.length);

        //    alert(id._id);
        axios.get(`http://localhost:3001/show_profile/${last}`)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    testerData: this.state.testerData.concat(response.data)
                });
            });
    }





    render() {
        // redirect based on successful login
        let redirectVar = null;
        if (!localStorage.getItem('user')) {
            redirectVar = <Redirect to="/login" />
        }


        let tester_details = this.state.testerData.map(item => {

            return(
                <Card>
                <Card.Header>Name: {item.name}</Card.Header>
                <Card.Body>
                  <Card.Title>About me: {item.about_me}</Card.Title>
                  <Card.Text>
                      <div className="row">
                          <div className="col-md-8">
                          <p>Email: {item.email}</p>
                   <p>Phone: {item.phone}</p>
                   <p>City: {item.city}</p>
                   <p>Country: {item.country}</p>
                   <p>Company: {item.company}</p>
                              </div>
                              <div className="col-md-4">
                              <img src="http://localhost:3000/images/profile.png" class="img-rounded" alt="Cinque Terre"/>
                              </div>
                          </div>
               
                  </Card.Text>
               
                </Card.Body>
              </Card>

                )
        })




        return (
<div>
{redirectVar}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Navigation email={this.state.email}/>
                    </div>
                    <div className="col-md-9">

                        <div className="top_100">
{tester_details}

                        </div>
                    </div>
                </div>
           
            </div>
</div>
        )
    }
}


export default Testers;