import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import axios from 'axios';


export class Announcements_faculty extends Component{

    constructor(){
        super();
        this.state = {  
            announcements : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/announcements_faculty',{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    announcements : this.state.announcements.concat(response.data) 
                });
            });
    }
    render(){



                       //iterate over courses to create a table row
                       let details = this.state.announcements.map(item => {
                        return(
                            <tr>
                                <td>{item.course_id}</td>
                                <td>{item.announcement}</td>
                                <td>{item.created_by}</td>
                                <td>{item.created_at}</td>
                               
                            </tr>
                        )
                    })
           //redirect based on successful login
           let redirectVar = null;
           let no_access = null;    
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if(!localStorage.getItem('user_type'))
        {
            redirectVar = <Redirect to= "/login"/>
        }
        if(localStorage.getItem('user_type')=="student"){
            no_access=<Redirect to= "/dashboard"/>
        }
        return(
            
        <div>
                {redirectVar}
                {no_access}
                <Navbar/>

            <div class="side_navigation">

                <div class="row">
                    <div class="col-md-2 col-sm-2">
                       
                    <Sidenavbar/>
                    </div>
                    <div class="col-md-10 col-sm-10">

                    <h3>Your Announcements</h3>
                        

                    <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Announcement</th>
                                    <th>Created By</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>




                    </div>
                </div>

            </div>
         </div>
        )

}
}