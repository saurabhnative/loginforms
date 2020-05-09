import React from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {redirectToHome} from '../Redirect/Redirect';
import '../../design.css'

function NavigateInRoles(props) {
    props.updateTitle('Change home menu')
    const sendDetailsToServer = (objectType) => {
        axios.get(API_BASE_URL+'isa/'+objectType)
            .then(function (response) {
                if(response.status === 200){
                    redirectToHome('',objectType)
                    props.showError(null)
                } else{
                    props.showError(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    }
    const handleSubmitClick = (type,e) => {
        e.preventDefault();
        sendDetailsToServer(type)
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <label>Select another role to view its menu:</label>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitClick("teamowner",e)}>Team Owner</button>
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitClick("teammanager",e)}>Team Manager</button>
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitClick("player",e)}>Player</button>
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmitClick("coach",e)}>Coach</button>
            </div>    
            </form>
            <div className="mt-2">
                <span className="loginText" onClick={() => redirectToHome('', props.typeOfUser)}>Back to menu</span> 
            </div>            
        </div>
    )
}

export default withRouter(NavigateInRoles);