import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'

function ApproveTeamCreation(props) {
    props.updateTitle('Approve teams')

    // functions defenition:
    const getTeamsFromServer = () => {
        axios.get(API_BASE_URL+'teamsforapproval')
            .then(function (response) {
                if(response.status === 200){
                    setTeams(prevState => ({
                        ...prevState,
                        'teamsList' : response.data
                    }))
                    props.showError(null)
                } else{
                    // props.showError(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    }

    const [teams , setTeams] = useState({
        teamsList : "",
        toApprove : "",
        successMessage : null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setTeams(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const approveTeamInServer = (teamName) => {
        axios.get(API_BASE_URL+'approveteam/'+teamName)
            .then(function (response) {
                if(response.status === 200){
                    setTeams(prevState => ({
                        ...prevState,
                        'successMessage' : response.data
                    }))
                    props.showError(null)
                } else{
                    props.showError(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(teams.toApprove.length && teams.teamsList.includes(teams.toApprove)) {
            approveTeamInServer(teams.toApprove)    
        } else {
            props.showError('Please enter a valid team name');
        }
    }

    var teamsDisplay;
    
    // calling the functions:
    getTeamsFromServer()
    if (teams.teamsList === ''){
        // no teams for approval
        teamsDisplay = 'There are no teams to approve'
    }
    else {
        // approve the teams
        teamsDisplay = teams.teamsList
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label className="row">Teams for approval:</label>
                <label>{teamsDisplay}</label>
                </div>
                <div className="form-group text-left">
                <label>Enter team name to approve</label>
                <input type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter team name"
                    value={teams.toApprove}
                    onChange={handleChange}
                />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Approve team
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: teams.successMessage ? 'block' : 'none' }} role="alert">
                {teams.successMessage}
            </div>
            <div className="mt-2">
                <span className="loginText" onClick={() => goBack()}>Back to menu</span> 
            </div>            
        </div>
    )
}

export default withRouter(ApproveTeamCreation);