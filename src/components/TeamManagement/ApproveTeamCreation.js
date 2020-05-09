import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {redirectToHome} from '../Redirect/Redirect'

function ApproveTeamCreation(props) {
    props.updateTitle('Approve teams')
    const [details , setDetails] = useState({
        name : "",
        field: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setDetails(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const getTeamsFromServer = () => {
        axios.get(API_BASE_URL+'teamsforapproval')
            .then(function (response) {
                if(response.data.code === 200){
                    setDetails(prevState => ({
                        ...prevState,
                        'successMessage' : 'Request for team ceation sent, waiting for union representative approval to create the team'
                    }))
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(details.name.length && details.field.length) {
            getTeamsFromServer()    
        } else {
            props.showError('Please enter a valid name and field');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label>Team name</label>
                <input type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={details.name}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label>Team field</label>
                <input type="text"
                    className="form-control"
                    id="field"
                    placeholder="Enter field"
                    value={details.field}
                    onChange={handleChange}
                />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Create team
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: details.successMessage ? 'block' : 'none' }} role="alert">
                {details.successMessage}
            </div>
            <div className="mt-2">
                <span className="loginText" onClick={() => redirectToHome('', props.typeOfUser)}>Back to menu</span> 
            </div>            
        </div>
    )
}

export default withRouter(ApproveTeamCreation);