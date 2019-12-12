import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
import Profile from './Profile';
import Repositories from './Repositories';
import Show_repo from './Show_repo';
import Testers from './Testers';

import show_profile from './show_profile';
import testResults from './testResults';

// import InterviewerDashboard from './InterviewerDashboard';
// import AdminDashboard from './AdminDashboard';
// import ShowEventAdmin from './ShowEventAdmin';
// import FeedbackForm from './FeedbackForm'; 
// import seeFeedback from './seeFeedback'; 
// import ShowEventInterviewer from './ShowEventInterviewer';
// import ShowEventStudent from './ShowEventStudent';
// import show_profile from './show_profile';

// import {Dashboard} from './Dashboard';
// import Account from './Account';
// import {Create_course} from './Create_course';
// import {Course_list} from './Course_list';
// import {In_waitlist} from './In_waitlist';
// import {Search_course} from './Search_course';
// import {Courses} from './Courses';
// import {Enrolled} from './Enrolled';
// import {Announcements_faculty} from './Announcements_faculty';
// import {Make_announcement} from './Make_announcement';
// import {Announcements_student} from './Announcements_student';
// import {All_enrolled} from './All_enrolled';
// import {Quiz} from './Quiz';
// import {Create_quiz} from './Create_quiz';
// import {Add_questions} from './Add_questions';
// import {Quiz_list} from './Quiz_list';
// import {Take_quiz} from './Take_quiz';
// import {Files_faculty} from './Files_faculty';
// import {Upload_file} from './Upload_file';

// import {Assignments_faculty} from './Assignments_faculty';
// import {Create_assignment} from './Create_assignment';
// import {Assignments_student} from './Assignments_student';

// import {Show_assignment_faculty} from './Show_assignment_faculty';
// import {Show_assignment_student} from './Show_assignment_student';
// import {Grades} from './Grades';
// import {Files_student} from './Files_student';
// import {Inbox} from './Inbox';
// import {Show_course} from './Show_course';

 class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route exact path="/" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/Login" component={Login}/>
                 <Route path="/Dashboard" component={Dashboard}/>
                <Route path="/Navigation" component={Navigation}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/Repositories" component={Repositories}/>
                <Route path="/Show_repo" component={Show_repo}/>
                <Route path="/Testers" component={Testers}/>
                <Route path="/show_profile" component={show_profile}/>
             
                
                <Route path="/testResults" component={testResults}/>
                
              {/*<Route path="/interviewer_dashboard" component={InterviewerDashboard}/>
                <Route path="/admin_dashboard" component={AdminDashboard}/>
                <Route path="/showeventadmin" component={ShowEventAdmin}/>
                <Route path="/feedbackform" component={FeedbackForm}/>
                <Route path="/seeFeedback" component={seeFeedback}/>
                <Route path="/showeventinterviewer" component={ShowEventInterviewer}/>
                <Route path="/showeventstudent" component={ShowEventStudent}/>
                <Route path="/show_profile" component={show_profile}/>
                 */}
                {/* <Route path="/Account" component={Account}/>
                <Route path="/dashboard" component={Dashboard}/>
                
                <Route path="/Create_course" component={Create_course}/>
                <Route path="/Course_list" component={Course_list}/>
                <Route path="/In_waitlist/:course_id" component={In_waitlist}/>
                <Route path="/Search_course" component={Search_course}/>
                <Route path="/Courses" component={Courses}/>
                <Route path="/Enrolled/:course_id" component={Enrolled}/>
                <Route path="/Announcements_faculty" component={Announcements_faculty}/>
                <Route path="/Make_announcement/:course_id" component={Make_announcement}/>
                 <Route path="/Announcements_student/:course_id" component={Announcements_student}/>
                <Route path="/All_enrolled/:course_id" component={All_enrolled}/>
                 <Route path="/Quiz" component={Quiz}/>
                 <Route path="/Create_quiz" component={Create_quiz}/>
                <Route path="/Add_questions/:quiz_id" component={Add_questions}/>
                <Route path="/Quiz_list/:course_id" component={Quiz_list}/>
                <Route path="/Take_quiz/:quiz_id" component={Take_quiz}/>
                <Route path="/Files_faculty" component={Files_faculty}/>
                <Route path="/Upload_file" component={Upload_file}/>
                <Route path="/Assignments_faculty" component={Assignments_faculty}/>
                <Route path="/Create_assignment" component={Create_assignment}/>
                <Route path="/Assignments_student/:course_id" component={Assignments_student}/>
                <Route path="/Show_assignment_faculty/:assignment_id" component={Show_assignment_faculty}/>
                <Route path="/Show_assignment_student/:assignment_id" component={Show_assignment_student}/>
                
                <Route path="/Grades/:course_id" component={Grades}/>
                <Route path="/Files_student/:course_id" component={Files_student}/>
                
                <Route path="/Inbox" component={Inbox}/>
                <Route path="/Show_course/:course_id" component={Show_course}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;