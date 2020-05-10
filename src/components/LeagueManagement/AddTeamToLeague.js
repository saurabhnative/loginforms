import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'

function AddTeamToLeague(props) {
    props.updateTitle('Add team or referee to season in league')
    const [details , setDetails] = useState({
        leaugueName : "",
        season : "2000",
        name:"",
        teamOrReferee:"team",
        successMessage: null
    })
    const handleChange = (e) => {
        if(e.target.validity.valid){
            const {id , value} = e.target
            setDetails(prevState => ({
                ...prevState,
                [id] : value
            }))
        }
    }
    const sendDetailsToServer = (object) => {
        var payload;
        var request;
        if(object === 'team'){
            payload=`{
                nameteam:${details.name},
                nameleague:${details.leaugueName},
                year:${details.season}
            }`
            request = 'addteamtoleague'
        }
        else if(object === 'referee'){
            payload=`{
                usernamereferee:${details.name},
                nameleague:${details.leaugueName},
                year:${details.season}
            }`
            request = 'setrefereeonleague'
        }
        axios.post(API_BASE_URL+request, payload)
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
        if(details.leaugueName.length && details.name.length){
            sendDetailsToServer()
        }
        else{
            props.showError('Please eneter valid parameters')
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="inputUsername">League Name</label>
                <input type="text"
                    className="form-control"
                    id="leaugueName"
                    placeholder="Enter league name"
                    value={details.leaugueName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label>Season of:</label>
                <div className="form-group text-center">
                    <select id="season" value={details.season} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="2000" className="form-control">2000</option>
                        <option value="2001" className="form-control">2001</option>
                        <option value="2002" className="form-control">2002</option>
                        <option value="2003" className="form-control">2003</option>
                        <option value="2004" className="form-control">2004</option>
                        <option value="2005" className="form-control">2005</option>
                        <option value="2006" className="form-control">2006</option>
                        <option value="2007" className="form-control">2007</option>
                        <option value="2008" className="form-control">2008</option>
                        <option value="2009" className="form-control">2009</option>
                        <option value="2010" className="form-control">2010</option>
                        <option value="2011" className="form-control">2011</option>
                        <option value="2012" className="form-control">2012</option>
                        <option value="2013" className="form-control">2013</option>
                        <option value="2014" className="form-control">2014</option>
                        <option value="2015" className="form-control">2015</option>
                        <option value="2016" className="form-control">2016</option>
                        <option value="2017" className="form-control">2017</option>
                        <option value="2018" className="form-control">2018</option>
                        <option value="2019" className="form-control">2019</option>
                        <option value="2020" className="form-control">2020</option>
                        <option value="2021" className="form-control">2021</option>
                    </select>
                </div>
                </div>
                <div className="form-group text-left">
                <label>Select one:</label>
                <div className="form-group text-center">
                    <select id="teamOrReferee" value={details.teamOrReferee} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="team" className="form-control">Team</option>
                        <option value="referee" className="form-control">Referee</option>
                    </select>
                </div>
                </div>
                <div className="form-group text-left">
                <label htmlFor="inputUsername">Name (of team or referee)</label>
                <input type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={details.name}
                    onChange={handleChange}
                />
                <small id="info" className="form-text text-muted">Note: league, season and team or referee have to be defined in the system</small>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Add
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

export default withRouter(AddTeamToLeague);