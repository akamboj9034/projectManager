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
import { FaPlusCircle } from 'react-icons/fa';

export class Add_questions extends Component{

    constructor(){
        super();
        this.state = {  
            Questions : [],
            authFlag:false,
            question_name:"",
            option_a:"",
            option_b:"",
            option_c:"",
            option_d:"",
            correct_answer:"",
        }
        this.changeQuestionName=this.changeQuestionName.bind(this);
        this.changeOption_a=this.changeOption_a.bind(this);
        this.changeOption_b=this.changeOption_b.bind(this);
        this.changeOption_c=this.changeOption_c.bind(this);
        this.changeOption_d=this.changeOption_d.bind(this);
        this.changeCorrectAnswer=this.changeCorrectAnswer.bind(this);

        
    }
    
    componentDidUpdate() {

        if (this.state.authFlag==true) {
            const {quiz_id} = this.props.match.params
            let id= {quiz_id};
            axios.get(`http://localhost:3001/quiz_questions/${id.quiz_id}`,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            Questions :response.data ,
            authFlag:false
           
        });
    });

        }

    }

    submitQuestion=(e)=>{

        const {quiz_id} = this.props.match.params
        let id= {quiz_id};

        const value = e.target.value;
       
const data={

    quiz_id:id.quiz_id,
    question_name:this.state.question_name,
    option_a:this.state.option_a,
    option_b:this.state.option_b,
    option_c:this.state.option_c,
    option_d:this.state.option_d,
    correct_answer:this.state.correct_answer
}

axios.post('http://localhost:3001/add_question',data,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
.then(response => {
    if(response.status === 200){
        this.setState({
            authFlag : true
        })
     
    }else{
        this.setState({
            authFlag : false
        })
    }
});

}
    //get the books data from backend  
    componentDidMount(){
        const {quiz_id} = this.props.match.params
        let id= {quiz_id};
        axios.get(`http://localhost:3001/quiz_questions/${id.quiz_id}`,{params:{user:localStorage.getItem('username')},headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    Questions : this.state.Questions.concat(response.data) 
                });
            });
    }

changeQuestionName(e){
this.setState({

    question_name:e.target.value
})

}

changeOption_a(e){
    this.setState({

        option_a:e.target.value
    })
     
}
changeOption_b(e){
    this.setState({

        option_b:e.target.value
    })
     
}

changeOption_c(e){
    this.setState({

        option_c:e.target.value
    })
     
}

changeOption_d(e){
    this.setState({

        option_d:e.target.value
    })
     
}


changeCorrectAnswer(e){
    this.setState({

        correct_answer:e.target.value
    })
     
}







    render(){


               //iterate over courses to create a table row
               let details = this.state.Questions.map(item => {
          
                return(

                <div>    

                    <div class="row">
                        <div class="question">
                            <h6>Question: {item.question_name}</h6>
                        
                        </div>
                        

                    </div>

                    <div class="row">
                        <div class="col-md-3">
                        <p>Option A: {item.option_a}</p>

                        </div>
                        <div class="col-md-3">
                        <p>Option B: {item.option_b}</p>

                        </div>
                        <div class="col-md-3">
                        <p>Option C: {item.option_c}</p>

                        </div>
                        <div class="col-md-3">
                        <p>Option D: {item.option_d}</p>

                        </div>



                    </div>

                    <h6>Correct answer: {item.correct_answer}</h6>
                    <br/>
                    <br/>


                </div>
           


                )
            })
           //redirect based on successful login
           let redirectVar = null;
           let page_type=null;
        //    if(!cookie.load('username')){    
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if(!localStorage.getItem('user_type'))
        {
            redirectVar = <Redirect to= "/login"/>
        }
        if(localStorage.getItem('user_type')=="student"){
            page_type = <Redirect to= "/login"/>
        }
        return(
            

            <div>
            {redirectVar}
            {page_type}
            <Navbar/>

        <div class="side_navigation  container-fluid">

            <div class="row">
                <div class="col-md-2 col-sm-2">
                   
                <Sidenavbar/>
                </div>
                <div class="col-md-10 col-sm-10">
                <br/>
                <br/>
                
                <div class="add_question">
                    <div class="form-group col-md-10">
                        <input onChange = {this.changeQuestionName} type="text" class="form-control" name="question_name" placeholder="Question name"/>
                    </div>
                    <div class="form-group col-md-6">
                        <input onChange = {this.changeOption_a} type="text" class="form-control" name="option_a" placeholder="option A"/>
                    </div>
                    <div class="form-group col-md-6">
                        <input onChange = {this.changeOption_b} type="text" class="form-control" name="option_b" placeholder="option B"/>
                    </div>
                    <div class="form-group col-md-6">
                        <input onChange = {this.changeOption_c} type="text" class="form-control" name="option_c" placeholder="option C"/>
                    </div>
                    <div class="form-group col-md-6">
                        <input onChange = {this.changeOption_d} type="text" class="form-control" name="option_d" placeholder="option D"/>
                    </div>

                    <div class="form-group">
                    <label>Correct Answer: </label>
                    <label class="radio-inline"><input type="radio" name="correct_answer" value="A" onChange={this.changeCorrectAnswer}/> A</label>
                    <label class="radio-inline"><input type="radio" name="correct_answer" value="B" onChange={this.changeCorrectAnswer}/> B</label>
                    <label class="radio-inline"><input type="radio" name="correct_answer" value="C" onChange={this.changeCorrectAnswer}/> C</label>
                    <label class="radio-inline"><input type="radio" name="correct_answer" value="D" onChange={this.changeCorrectAnswer}/> D</label>
                    </div>

                    <button class="btn btn-success" onClick={this.submitQuestion}>Add Question</button>



                </div>





<br/>
<br/>
<br/>


                <h3>Questions for this Quiz</h3>

                {details}
                
                </div>
            </div>

        </div>
     </div>

        )

}
}