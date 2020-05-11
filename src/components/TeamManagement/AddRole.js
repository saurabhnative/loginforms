import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'

function AddRole(props) {
    props.updateTitle('Add a user type (in the same team)')
    const [details , setDetails] = useState({
        userType : "teamowner",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setDetails(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        const payload=`{
            role:'${details.userType}'
        }`
        axios.post(API_BASE_URL+'addrole', payload)
            .then(function (response) {
                if(response.status === 200){
                    setDetails(prevState => ({
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
        sendDetailsToServer()    
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label>Select a role to add:</label>
                <div className="form-group text-center">
                    <select id="userType" value={details.userType} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="teamowner" className="form-control">Team Owner</option>
                        <option value="teammanager" className="form-control">Team Manager</option>
                        <option value="player" className="form-control">Player</option>
                        <option value="coach" className="form-control">Coach</option>
                    </select>
                </div>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Add role to user
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: details.successMessage ? 'block' : 'none' }} role="alert">
                {details.successMessage}
            </div>
            <div className="mt-2">
                <span className="loginText" onClick={() => goBack()}>Back to menu</span> 
            </div>            
        </div>
    )
}

export default withRouter(AddRole);