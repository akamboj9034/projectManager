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


export class All_enrolled extends Component{

    constructor(){
        super();
        this.state = {  
            enrolled : [],
            current_page:0
         
        }
    }  
    handleClick(e)
    {
        alert(e.target.value);
    }

    
    //get the books data from backend  
    componentDidMount(){
        const {course_id} = this.props.match.params
        let id= {course_id};
        axios.get(`http://localhost:3001/all_enrolled/${id.course_id}?page=${this.state.current_page}`,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
        // axios.get(`http://localhost:3001/all_enrolled/${id.course_id}`)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    enrolled : this.state.enrolled.concat(response.data) ,
                    
                });
         
         
      

            });
    }


    handlePrevious=()=>
    {

        let t=this.state.current_page-1;
        if(t<0)
        {
            t=0;
            alert("no more data");
        }else{
            this.changestate(-1);
        }
    
       
              const {course_id} = this.props.match.params
        let id= {course_id};
        axios.get(`http://localhost:3001/all_enrolled/${id.course_id}?page=${t}`,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
        .then(response =>{
      
                console.log(response.data);
 
     this.setState({
        enrolled: response.data,
       
    });

            
        });


    }

    handlenext=()=>
    {
        this.changestate(1);
    let t=this.state.current_page+1;
   

    const {course_id} = this.props.match.params
    let id= {course_id};
    axios.get(`http://localhost:3001/all_enrolled/${id.course_id}?page=${t}`,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
        .then(response =>{
      
                console.log(response.data);
                if(response.data=="error")
                {  
                    alert("no more data");
                    this.changestate(-1);

                }else{   
                     this.setState({
                        enrolled: response.data,
                   
                });

                }
              
   
            
        });
    }


changestate(e){
this.setState({
    current_page:this.state.current_page+e
})
}

    render(){


               //iterate over courses to create a table row
               let details = this.state.enrolled.map(item => {

                return(
                    <tr>
               
                        <td>{item.username}</td>
                        <td>{item.email}</td>
             </tr>
                )
            })

            
           //redirect based on successful login
           let redirectVar = null;
        //    let page_type="";
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
                
     
<h3>All students enrolled in the course</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                        <br/>
<br/>
<button class="btn btn-primary left"  onClick={this.handlePrevious}>previous</button>
<button class="btn btn-primary right"  onClick={this.handlenext}>next</button>
                </div>
            </div>

        </div>
     </div>








   
        )

}
}