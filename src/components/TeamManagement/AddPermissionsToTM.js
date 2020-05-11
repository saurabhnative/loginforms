import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function AddPermissionsTM(props) {
    props.updateTitle('Add permissions to a team manager')
    const [details , setDetails] = useState({
        username : "",
        permissions : "1",
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
            username:${details.username},
            permissions:'${details.permissions}'
        }`
        axios.post(API_BASE_URL+'addpermissiontoteammanger', payload)
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
        if(details.username.length) {
            sendDetailsToServer()    
        } else {
            props.showError('Please enter a valid user name');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label>Team manager username</label>
                <input type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={details.username}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group text-center">
                    <Container>
                    <Row><label>Select permissions to add:</label></Row>
                    <select id="permissions" value={details.permissions} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="Edit_team" className="form-control">Edit team</option>
                        <option value="Appointment_of_team_owner" className="form-control">Add team owner</option>
                        <option value="Remove_Appointment_of_team_owner" className="form-control">Remove team owner</option>
                        <option value="Appointment_of_team_manager" className="form-control">Add team manager</option>
                        <option value="Remove_Appointment_of_team_manager" className="form-control">Remove team manager</option>
                        <option value="Appointment_of_player" className="form-control">Add player</option>
                        <option value="Remove_Appointment_of_player" className="form-control">Remove player</option>
                        <option value="Team_financial" className="form-control">Manage financials</option>
                        <option value="Close_team" className="form-control">Close team</option>
                    </select>
                    </Container>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Add permissions
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

export default withRouter(AddPermissionsTM);