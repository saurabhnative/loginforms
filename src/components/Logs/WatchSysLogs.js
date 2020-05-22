import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import SubmitButton from '../InputFields/SubmitButton';
import TextInput from '../InputFields/TextInput';

function WatchSysLogs(props) {
    props.updateTitle('Watch System Logs')
    const [details , setDetails] = useState({
        path : "",
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
        axios.post(API_BASE_URL+'watchlogger/'+details.path)
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
        if(details.path.length) {
            sendDetailsToServer()    
        } else {
            props.showError('Please enter a valid path');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <div className="form-group text-center">
                <TextInput label="Insert a path to save the logs file" id="path" placeholder="Enter a path" state={details.path} handleChange={handleChange}/>
            </div>            
            <SubmitButton handleSubmitClick={handleSubmitClick} buttonText="Select path for logs"/>
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

export default withRouter(WatchSysLogs);