import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {redirectToHome, redirectToRegister} from '../Redirect/Redirect'

function LoginForm(props) {
    props.updateTitle('Login')
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();

    //    //  this should be removed:
    //     setState(prevState => ({
    //         ...prevState,
    //         'successMessage' : 'Login successful. Redirecting to home page..'
    //     }))
    //     redirectToHome(state.username,'');
    //     props.showError(null)
        
        // this will send the messag to the server when it will work:
        const payload=`{ 
            username: ${state.username},
            password: '${state.password}'
        }`

        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    redirectToHome(state.username, response.data);
                    props.showError(null)
                }
                else{
                    props.showError(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" 
                       className="form-control" 
                       id="username" 
                       placeholder="Enter username" 
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
            <div className="mt-2">
                <span className="loginText" onClick={() => redirectToHome('','guest')}>Enter as a guest</span> 
            </div>   
        </div>
    )
}

export default withRouter(LoginForm);