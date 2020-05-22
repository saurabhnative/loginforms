import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import SubmitButton from '../InputFields/SubmitButton';
import NumberInput from '../InputFields/NumberInput'
import TextInput from '../InputFields/TextInput';

class AnswerComplaints extends Component{
    
    state = {
        complaintsList : [],
        displayComplaintsList : [],
        id : "",
        answer: "",
        successMessage : null
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)

        new Promise((resolved, rejected) => {
            try{
                axios.get(API_BASE_URL+'watchcomplaints')
                    .then(response => {
                        if(response.status === 200){
                            console.log(response)
                            let list = response.data;
                            return list
                
                        }else{
                            rejected("No response")
                        }
                
                      })
                      .then(list => {
                        this.setState(prevState => ({
                            ...prevState,
                            'complaintsList' : list
                        }))
                        return list;
                
                      })
                    .then(result => {
                        // verify the result is valid and not empty
                        if(result && result[0] !== ""){
                            this.setState(prevState => ({
                                ...prevState,
                                'displayComplaintsList' : result.map((team)=>{
                                    return (
                                        <div className="form-group">
                                            <label>{team}</label>
                                        </div>
                                    );
                                })
                            }))
                        }
                        else { 
                            // result is undefined -> did not get a response from the server
                            this.setState(prevState => ({
                                ...prevState,
                                'displayComplaintsList' :  ['There are no complaints']
                            }))
                        }
                    })
                    .catch(error => {
                        this.setState(prevState => ({
                            ...prevState,
                            'displayComplaintsList' :  ['There are no complaints']
                        }))
                    })          
            } catch (e) {
                rejected(e)
            }
        })
    }

    handleChange(e){
        if(e.target.validity.valid){
            const {id , value} = e.target
            this.setState(prevState => ({
                ...prevState,
                [id] : value
            }))
        }
    }

    answerComplaint(){
        const payload=`{
            ID:'${this.state.id}',
            answer:'${this.state.answer}'            
        }`
        axios.post(API_BASE_URL+'answercomplaints', payload)
            .then(function (response) {
                if(response.status === 200){
                    this.setState(prevState => ({
                        ...prevState,
                        'successMessage' : response.data
                    }))
                    this.props.showError(null)
                } else{
                    this.props.showError(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    }
    
    handleSubmitClick(){
        if(this.state.id.length && this.state.answer.length) {
            this.answerComplaint()    
        } else {
            this.props.showError('Please enter a valid complaint id and answer');
        }
    }

    render() {
        this.props.updateTitle('Answer Complaints')
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                    <label className="row">Active Complaints:</label>
                    {this.state.displayComplaintsList}
                    </div>
                    <NumberInput label="Enter complaint ID to approve" id="id" placeholder="Enter in digits" state={this.state.id} handleChange={this.handleChange}/>
                    <TextInput label="Your Answer" id="answer" placeholder="Enter answer" state={this.state.answer} handleChange={this.handleChange}/>
                    <SubmitButton handleSubmitClick={this.handleSubmitClick} buttonText="Submit answer"/>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="mt-2">
                    <span className="loginText" onClick={() => goBack()}>Back to menu</span> 
                </div>            
            </div>
        )
    }
}

export default withRouter(AnswerComplaints);