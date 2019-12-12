import React, { Component, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

// import { item, Icon, cloud, CardTitle, Textarea,ProgressBar, Container, SideNav, SideNavItem, MediaBox, Row, Col, Card, Button, Table, Select, Collection, CollectionItem } from 'react-materialize';


// import { FaUserEdit ,FaFolder,IoMdFolderOpen} from "react-icons/IoIoS";
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Modal } from 'react-bootstrap';
// import ModalDialog from 'react-bootstrap/ModalDialog';
// import ModalHeader from 'react-bootstrap/ModalHeader';
// import ModalTitle from 'react-bootstrap/ModalTitle';
// import ModalBody from 'react-bootstrap/ModalBody';
import { Button } from 'react-bootstrap';
import { ItemMeta } from 'semantic-ui-react';

//Define a Login Component
class Repositories extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: localStorage.getItem('user'),
            repoData: [],
            authFlag: false,
            error_message: "",
            show: false,
            setShow: false,
            repoName:"",
            repoDescription:"",
            confirmation:"",
            tester_show: false,
            tester_setShow: false,
            testerData:[],
            assignRepo:"",
            assignTester:"",
            repoError:""
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.tester_handleClose = this.tester_handleClose.bind(this);
        this.tester_handleShow = this.tester_handleShow.bind(this);
        this.addRepo = this.addRepo.bind(this);
        this.assignTester = this.assignTester.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    handleClose = () => {
        this.setState({
            setShow: false,
            show: false
        })
    }
    handleShow = (e) => {
         
        this.setState({
            setShow: true,
            show: true
         
        })

       
    }

    tester_handleClose = () => {
        this.setState({
            tester_setShow: false,
            tester_show: false
        })
    }
    tester_handleShow = (e) => {
        // alert(e.target.value);
        axios.get('http://localhost:3001/get_tester_data',{params:{user:localStorage.getItem('user')}})
        .then((response) => {
        //update the state with the response data

        this.setState({
            testerData :response.data
        });

    });

        this.setState({
            tester_setShow: true,
            tester_show: true,
            assignRepo:e.target.value
            
        })
    }
    repoNameChangeHandler = (e) => {
        this.setState({
            repoName: e.target.value
        })
    }
       
    repoDescriptionChangeHandler = (e) => {
        this.setState({
            repoDescription: e.target.value
        })
    }
 
    //submit Login handler to send a request to the node backend
    addRepo = (e) => {
if(this.state.repoName=="" || this.state.repoDescription=="")
{
    this.setState({
       repoError:"Please enter Repository name and description"
    })

}else{
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();



        const data = {
            repoName: this.state.repoName,
            repoDescription: this.state.repoDescription,
            created_by:localStorage.getItem("user")
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/add_repository', data)
            .then(response => {
                console.log("Status Code : ", response.status);
this.setState({
    confirmation:"Repo created successfully"
})
this.handleClose();
       this.setState({
           authFlag:true,
        confirmation:"Repo created successfully"
       })

            });
    }
}
    //submit Login handler to send a request to the node backend
    assignTester = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            repo: this.state.assignRepo,
            tester: e.target.value,
            assigned_by:localStorage.getItem("user")
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/assign_tester', data)
            .then(response => {
                console.log("Status Code : ", response.status);

this.tester_handleClose();
       this.setState({
           authFlag:true
       })

            });
    }


    
    removeRepo = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
           
            repo: e.target.value
        }
        // alert(this.state.username);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/remove_repo', data)
            .then(response => {
                console.log("Status Code : ", response.status);

// this.tester_handleClose();
       this.setState({
           authFlag:true
       })

            });
    }
    componentDidMount(){

        axios.get('http://localhost:3001/get_repo_data',{params:{user:localStorage.getItem('user')}})
                .then((response) => {
                //update the state with the response data

                this.setState({
                    repoData : this.state.repoData.concat(response.data)
                });
       
            });
    }


    componentDidUpdate() {
     
        if (this.state.authFlag==true) {
            axios.get('http://localhost:3001/get_repo_data',{params:{user:localStorage.getItem('user')}})
                    .then((response) => {
        //update the state with the response data
        this.setState({
            repoData :response.data ,
            authFlag:false
           
        });
    });

        }

    }
    render() {
        // redirect based on successful login
        let redirectVar = null;
        let buttonType = null;

        if (!localStorage.getItem('user')) {
            redirectVar = <Redirect to="/login" />
        }

        let details = this.state.repoData.map(item => {
            let current_datetime = new Date(item.created_at);
            let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
           if(!item.assigned)
           {
buttonType=<button className="btn btn-primary" value={item._id} onClick={this.tester_handleShow}>Assign</button>
           }else{
            buttonType=<button className="btn btn-success" disabled>Assigned</button>
           }
            return(
                <tr>
                    
                    
                    <td><Link to={`/show_repo/${item._id}`}> {item.repoName}</Link></td>
                    <td>{item.repoDescription}</td>
                    <td> {formatted_date}</td>
                    <td>{buttonType}</td>
                    <td><button onClick={this.removeRepo}  value={item._id} className=" btn-danger removeRepo"><span className="fa fa-trash-o " ></span></button></td>
                    
                     </tr>
            )
        })


        let tester_details = this.state.testerData.map(item => {

            return(
                <tr>
                    
                    
                    <td>{item.name}</td>
                    <td> {item.about_me}</td>
                    <td><button className="btn btn-primary" value={item._id} onClick={this.assignTester}>Assign</button></td>
                    
                     </tr>
            )
        })






        return (
            <div>
                {redirectVar}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Navigation email={this.state.email} />
                        </div>
                        <div className="col-md-9">

                            <div className="row top_100">

                                <Button variant="primary" onClick={this.handleShow}>
                                    <span className="fa fa-plus-square-o"></span> New Repository
      </Button>
  
    
<span className="right confirmation">{this.state.confirmation}</span>
                            </div>


<hr/>

<h3>Repositories created by you</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Repo Name</th>
                                    <th>Description</th>
                                    <th>Created on</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>








                            <Modal show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                                    <Modal.Title>Create new Repository</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <label for="repoName">Repository Name</label>
                                    <div className="form-group">

                                        <input onChange={this.repoNameChangeHandler} type="text" className="form-control" name="repoName" placeholder="Repository Name" />
                                    </div>
                                    <label for="repoDescription">Description</label>
                                    <div className="form-group">
                                        <input onChange={this.repoDescriptionChangeHandler} type="text" className="form-control" name="repoDescription" placeholder="Name" />
                                    </div>


{this.state.repoError}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
          </Button>
                                    <Button variant="primary" onClick={this.addRepo}>
                                        Save Changes
          </Button>
                                </Modal.Footer>
                            </Modal>






                            <Modal show={this.state.tester_show} onHide={this.tester_handleClose} >
                                <Modal.Header closeButton>
                                    <Modal.Title>All Testers</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                <table class="table">
                            <thead>
                                <tr>
                                    <th>Tester Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {tester_details}
                            </tbody>
                        </table>


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.tester_handleClose}>
                                        Close
          </Button>
                
                                </Modal.Footer>
                            </Modal>



                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Repositories;