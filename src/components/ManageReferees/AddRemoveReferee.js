import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SubmitButton from '../InputFields/SubmitButton';

function AddRemoveReferee(props) {
    props.updateTitle('Add or remove referees')
    const [details , setDetails] = useState({
        refereeUsername : "",
        addOrRemove : "",
        password : "",
        confirm: "",
        email : "",
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
            usernamereferee:${details.refereeUsername},
            password:'${details.password}',
            email:${details.email},
            addremove:'${details.addOrRemove}'
        }`
        axios.post(API_BASE_URL+'addremovereferee', payload)
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
        if(details.password !== details.confirm){
            props.showError('Passwords do not match')
        }
        else if(details.refereeUsername.length && details.addOrRemove.length && details.password) {
            sendDetailsToServer(details.objectType)    
        } else {
            props.showError('Please enter valid parameters');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
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
            <div className="form-group text-left">
                <label>Referee username</label>
                <input type="text"
                    className="form-control"
                    id="refereeUsername"
                    placeholder="Enter referee username"
                    value={details.refereeUsername}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group text-left">
                <label>Referee email</label>
                <input type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={details.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group text-left">
                <label>Referee password</label>
                <input type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={details.password}
                    onChange={handleChange}
                />                
            </div>
            <div className="form-group text-left">
                <label>Confirm password</label>
                <input type="password"
                    className="form-control"
                    id="confirm"
                    placeholder="Confirm password"
                    value={details.confirm}
                    onChange={handleChange}
                />                
            </div>
            <SubmitButton handleSubmitClick={handleSubmitClick} buttonText="Update referee"/>
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

export default withRouter(AddRemoveReferee);