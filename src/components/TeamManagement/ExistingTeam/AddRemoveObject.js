import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../../Redirect/Redirect'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SubmitButton from '../../InputFields/SubmitButton';

function AddRemoveObjectFromTeam(props) {
    props.updateTitle('Manage team members and fields')
    const [details , setDetails] = useState({
        teamName : "",
        addOrRemove : "",
        objectType : "teamowner",
        objectName : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setDetails(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = (objectType) => {
        const payload=`{
            teamname:${details.teamName},
            objectname:${details.objectName},
            addremove:'${details.addOrRemove}'
        }`
        axios.post(API_BASE_URL+'addremove'+objectType, payload)
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
    const handleSubmitClick = () => {
        if(details.teamName.length && details.addOrRemove.length && details.objectName) {
            sendDetailsToServer(details.objectType)    
        } else {
            props.showError('Please enter valid parameters');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label>Team name</label>
                <input type="text"
                    className="form-control"
                    id="teamName"
                    placeholder="Enter team name"
                    value={details.teamName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group text-center">
                <Container>
                    <Row><label>Select an action:</label></Row>
                    <Row>
                    <Col>
                    <label>
                        <input type="radio" 
                        className="form-control"
                        name="addOrRemove"
                        id="addOrRemove"
                        value="1"
                        onChange={handleChange}
                    />
                    Add
                    </label>
                    </Col>
                    <Col>
                    <label>
                    <input type="radio" 
                        className="form-control"
                        name="addOrRemove"
                        id="addOrRemove"
                        value="0"
                        onChange={handleChange}
                    />
                    Remove
                    </label>
                    </Col>
                    </Row>
                </Container>
                </div>
                <div className="form-group text-center">
                    <select id="objectType" value={details.objectType} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="teamowner" className="form-control">Team Owner</option>
                        <option value="teammanager" className="form-control">Team Manager</option>
                        <option value="player" className="form-control">Player</option>
                        <option value="coach" className="form-control">Coach</option>
                        <option value="teamfield" className="form-control">Field</option>                        
                    </select>
                </div>
                <div className="form-group text-left">
                <label>Name of added object</label>
                <input type="text"
                    className="form-control"
                    id="objectName"
                    placeholder="Enter name"
                    value={details.objectName}
                    onChange={handleChange}
                />
                </div>
                <SubmitButton handleSubmitClick={handleSubmitClick} buttonText="Update team"/>
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

export default withRouter(AddRemoveObjectFromTeam);