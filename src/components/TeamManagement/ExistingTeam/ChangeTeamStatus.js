import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../../Redirect/Redirect'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function ChangeTeamStatus(props) {
    props.updateTitle('Change team status')
    const [details , setDetails] = useState({
        name : "",
        status : "1",
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
            nameteam:${details.name},
            status:'${details.status}'
        }`
        axios.post(API_BASE_URL+'changestatusforteam', payload)
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
        if(details.name.length) {
            sendDetailsToServer()    
        } else {
            props.showError('Please enter a valid name');
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
                <div className="form-group text-center">
                    <Container>
                    <Row><label>Select status:</label></Row>
                    <select id="status" value={details.status} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="1" className="form-control">Open</option>
                        <option value="0" className="form-control">Closed</option>
                    </select>
                    </Container>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Update status
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

export default withRouter(ChangeTeamStatus);