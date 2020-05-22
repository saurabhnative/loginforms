import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import SubmitButton from '../InputFields/SubmitButton';

class ApproveTeamCreation extends Component{
    
    state = {
        teamsList : [],
        displayTeamsList : [],
        toApprove : "",
        successMessage : null
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)

        new Promise((resolved, rejected) => {
            try{
                axios.get(API_BASE_URL+'teamsforapproval')
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
                            'teamsList' : list
                        }))
                        return list;
                
                      })
                    .then(result => {
                        // verify the result is valid and not empty
                        if(result && result[0] !== ""){
                            this.setState(prevState => ({
                                ...prevState,
                                'displayTeamsList' : result.map((team)=>{
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
                                'displayTeamsList' :  ['There are no teams to approve']
                            }))
                        }
                    })
                    .catch(error => {
                        this.setState(prevState => ({
                            ...prevState,
                            'displayTeamsList' :  ['There are no teams to approve']
                        }))
                    })          
            } catch (e) {
                rejected(e)
            }
        })
    }

    handleChange(e){
        const {id , value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    approveTeamInServer(teamName){
        axios.get(API_BASE_URL+'approveteam/'+teamName)
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
        // e.preventDefault();
        let a = this.state.toApprove
        let b =  this.state.teamsList
        if(a.length && b.some(item => this.state.toApprove === item)) {
            this.approveTeamInServer(this.state.toApprove)    
        } else {
            this.props.showError('Please enter a valid team name');
        }
    }

    render() {
        this.props.updateTitle('Approve teams')
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                    <label className="row">Teams for approval:</label>
                    {/* <label>{teamsDisplay}</label> */}
                    {this.state.displayTeamsList}
                    </div>
                    <div className="form-group text-left">
                    <label>Enter team name to approve</label>
                    <input type="text"
                        className="form-control"
                        id="toApprove"
                        placeholder="Enter team name"
                        value={this.state.toApprove}
                        onChange={this.handleChange}
                    />
                    </div>
                    <SubmitButton handleSubmitClick={this.handleSubmitClick} buttonText="Approve team"/>
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

export default withRouter(ApproveTeamCreation);