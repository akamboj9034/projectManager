import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { Modal } from 'react-bootstrap';
// import { item, Icon, cloud, CardTitle, Textarea,ProgressBar, Container, SideNav, SideNavItem, MediaBox, Row, Col, Card, Button, Table, Select, Collection, CollectionItem } from 'react-materialize';

import { FaUserEdit, FaFolder } from "react-icons/fa";
// import { FaUserEdit ,FaFolder,IoMdFolderOpen} from "react-icons/IoIoS";
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Button ,Card} from 'react-bootstrap';

import listReactFiles from 'list-react-files';
//Define a Login Component
class Show_repo extends Component {
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
            repoData: [],
            selectedFile: null,
            fileData: [],
            show: false,
            setShow: false,
            repoId:"",
            link_show: false,
            link_setShow: false,
            linkData:[]
        }
        //Bind the handlers to this class
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.link_handleClose = this.link_handleClose.bind(this);
        this.link_handleShow = this.link_handleShow.bind(this);
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


    link_handleClose = () => {
        this.setState({
            link_setShow: false,
            link_show: false
        })
    }
    link_handleShow = (e) => {

        this.setState({
            link_setShow: true,
            link_show: true

        })


    }
    componentDidUpdate() {

        if (this.state.authFlag == true) {

            var last = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1, this.props.location.pathname.length);

            //    alert(id._id);
            axios.get(`http://localhost:3001/show_repo/${last}`)
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        repoData: response.data.repoData,
                        fileData: response.data.fileData,
                        authFlag: false
                    });
                });




        }

    }


    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
    }
    onClickHandler = () => {

        var repoId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1, this.props.location.pathname.length);

        const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        data.append('repoId', repoId);
        axios.post("http://localhost:3001/upload", data, { params: { repoId: repoId } }, {
            // receive two    parameter endpoint url ,form data
        })

            .then(res => { // then print response status
                console.log(res.statusText)
                this.setState({
                    authFlag: true
                })
                this.handleClose();
            })

    }
    componentDidMount() {

        var last = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1, this.props.location.pathname.length);

        //    alert(id._id);
        axios.get(`http://localhost:3001/show_repo/${last}`)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    repoData: this.state.repoData.concat(response.data.repoData),
                    fileData: this.state.repoData.concat(response.data.fileData),
                    repoId:last
                });
            });
    }


    render() {
        // redirect based on successful login
        let redirectVar = null;
        if (!localStorage.getItem('user')) {
            redirectVar = <Redirect to="/login" />
        }

        let repo_details = this.state.repoData.map(item => {
            var buttonType=null;
            var button2=null;
if(item.assigned)
{
 buttonType=<Link to={`/show_profile/${item.assigned_to._id}`}><button className="btn btn-success">Assigned to {item.assigned_to.name}</button> </Link>
button2=<Link to="/testResults"><button className="btn btn-primary">Test Results</button></Link>
}else{
     buttonType=<button className="btn btn-danger" disabled>Not Assigned</button>
}
            return (
    


<Card>
  <Card.Header>Repository: {item.repoName}</Card.Header>
  <Card.Body>
    <Card.Title>Description: {item.repoDescription}</Card.Title>
    <Card.Text>
 
{buttonType}<br/><br/>
{button2}


          

    </Card.Text>
  

  </Card.Body>
</Card>



            )
        })

        let file_details = this.state.fileData.map(item => {

            return (
                <tr>


                  <td>{item}</td>
                     <a href={"http://localhost:3000/uploads/"+this.state.repoId+"/"+item} download> <td><button className="btn btn-primary">Download</button></td></a>

                </tr>
            )
        })

        let link_details = this.state.linkData.map(item => {

            return (
                <tr>


                  <td>{item}</td>
                     <a href={"http://localhost:3000/uploads/"+this.state.repoId+"/"+item} > <td><button className="btn btn-primary">Open link</button></td></a>

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

                            <div className=" top_100">
                         
{repo_details}
<br/>
<br/>
<br/>
<button className="btn btn-primary" onClick={this.handleShow}>  <span className="fa fa-plus-square-o"></span> New File</button> 
<span > OR </span>
<button className="btn btn-primary" onClick={this.link_handleShow}>  <span className="fa fa-plus-square-o"></span> New Link</button> 
<br/>
<br/>


                            
                              
                                    <h3>Files in the repository</h3>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>File Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/*Display the Tbale row based on data recieved*/}
                                            {file_details}
                                        </tbody>
                                    </table>



<br/>
<br/>
<br/>

<h3>Links in the repository</h3>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Link</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/*Display the Tbale row based on data recieved*/}
                                            {link_details}
                                        </tbody>
                                    </table>

                           




                                <Modal show={this.state.show} onHide={this.handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Files</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <label for="repoName">Select Files</label>
                                        <div className="form-group">
                                            <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />
                                        </div>




                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
          </Button>
                                        <Button variant="primary" onClick={this.onClickHandler}>
                                            Upload
          </Button>
                                    </Modal.Footer>
                                </Modal>




                                <Modal show={this.state.link_show} onHide={this.link_handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Link</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <label for="repoName">Add Link</label>
                                        <div className="form-group">
                                            <input type="text" class="form-control"  onChange={this.link_onChangeHandler} />
                                        </div>




                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.link_handleClose}>
                                            Close
          </Button>
                                        <Button variant="primary" onClick={this.link_onClickHandler}>
                                            Upload
          </Button>
                                    </Modal.Footer>
                                </Modal>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Show_repo;