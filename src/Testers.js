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

    componentDidMount(){

        axios.get('http://localhost:3001/get_tester_data',{params:{user:localStorage.getItem('user')}})
                .then((response) => {
                //update the state with the response data

                this.setState({
                    testerData : this.state.testerData.concat(response.data)
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
                <tr>
                    
                    
                    <td>{item.name}</td>
                    <td> {item.email}</td>
                    <td> {item.phone}</td>
                    <td> {item.city}</td>
               <td><Link to={`/show_profile/${item._id}`}><button className="btn btn-primary">View Profile</button> </Link></td>      
                     </tr>
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

                        <h3>All Testers</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Tester Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {tester_details}
                            </tbody>
                        </table>

                        </div>
                    </div>
                </div>
           
            </div>
</div>
        )
    }
}


export default Testers;