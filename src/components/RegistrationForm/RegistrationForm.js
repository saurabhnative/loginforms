import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import {withRouter} from "react-router-dom";
import {redirectToHome, redirectToLogin} from '../Redirect/Redirect'
import SubmitButton from '../InputFields/SubmitButton';

function RegistrationForm(props) {
    props.updateTitle('Registration')
    const [userDetails , setUserDetails] = useState({
        username : "",
        email : "",
        role : "UnionRepresentative",
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
            const payload=`{
                username:${userDetails.username},
                password:'${userDetails.password}',
                role:${userDetails.role},
                email:${userDetails.email}                
            }`
            axios.post(API_BASE_URL+'registration', payload)
                .then(function (response) {
                    console.log(response)
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
    const handleSubmitClick = () => {
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
                    //    aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={userDetails.email}
                       onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">Enter your email in order to receive updates</small> */}
                </div>
                <div className="form-group text-left">
                    <label className="row">
                    Select a user type:
                    </label>
                    <select id="role" value={userDetails.role} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="UnionRepresentative" className="form-control">Union Representative</option>
                        <option value="Player" className="form-control">Player</option>
                        <option value="Coach" className="form-control">Coach</option>
                        <option value="TeamManager" className="form-control">Team Manager</option>
                        <option value="TeamOwner" className="form-control">Team Owner</option>
                        <option value="Referee" className="form-control">Referee</option>
                        <option value="Fan" className="form-control">Fan</option>
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
                <SubmitButton handleSubmitClick={handleSubmitClick} buttonText="Register"/>
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