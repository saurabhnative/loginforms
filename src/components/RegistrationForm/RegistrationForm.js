import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import {withRouter} from "react-router-dom";
import {redirectToHome, redirectToLogin} from '../Redirect/Redirect'

function RegistrationForm(props) {
    props.updateTitle('Registration')
    const [userDetails , setUserDetails] = useState({
        username : "",
        email : "",
        role : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setUserDetails(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(userDetails.username.length && userDetails.password.length) {
            const payload={
                "username":userDetails.username,
                "role":userDetails.role,
                "password":userDetails.password
            }
            axios.post(API_BASE_URL+'register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setUserDetails(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Login to continue.'
                        }))
                        // redirectToLogin();
                        props.showError(null)
                    } else{
                        props.showError(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }       
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(userDetails.password === userDetails.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="inputUsername">User Name</label>
                <input type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={userDetails.username}
                    onChange={handleChange}
                />
                {/* <small id="rolelHelp" className="form-text text-muted">i.e. Referee, Union Representitive, Coach, Player, Team Manager, Team Owner, Fan.</small> */}
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={userDetails.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">Enter your email in order to receive updates</small>
                </div>
                <div className="form-group text-left">
                    <label className="row">
                    Select a user type:
                    </label>
                    <select id="role" value={userDetails.role} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="unionrepresentative" className="form-control">Union Representative</option>
                        <option value="player" className="form-control">Player</option>
                        <option value="coach" className="form-control">Coach</option>
                        <option value="teammanager" className="form-control">Team Manager</option>
                        <option value="teamowner" className="form-control">Team Owner</option>
                        <option value="referee" className="form-control">Referee</option>
                        <option value="fan" className="form-control">Fan</option>
                    </select>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={userDetails.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: userDetails.successMessage ? 'block' : 'none' }} role="alert">
                {userDetails.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            <div className="mt-2">
                <span className="loginText" onClick={() => redirectToHome('','guest')}>Enter as a guest</span> 
            </div>            
        </div>
    )
}

export default withRouter(RegistrationForm);