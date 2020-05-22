import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import TimePicker from '../TimePicker/TimePicker';
import TextInput from '../InputFields/TextInput';
import NumberInput from '../InputFields/NumberInput';
import SubmitButton from '../InputFields/SubmitButton';

function UpdateEvent(props) {
    var request;
    var buttonText;
    if(props.newSeason === true){
        request = "???????"
        props.updateTitle('Add event to game')
        buttonText = "Add event"
    }
    else{
        request = "????????"
        props.updateTitle('Update existing event in game')
        buttonText = "Update event in game"
    }
    const [startDate, setStartDate] = useState(new Date());
    const [details , setDetails] = useState({
        teamName : "",
        playerName : "",
        eventType : "2000",
        gameId:"",
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
    const sendDetailsToServer = () => {
        const payload=`{
            nameteam:${details.teamName},
            nameuserplayer:${details.playerName},
            eventype:'${details.eventType}',
            gameid:'${details.gameId}',
            date:'${startDate}'
        }`
        console.log(payload)
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
    const handleSubmitClick = () => {
        if(details.teamName.length && details.gameId.length && details.playerName.length){
            sendDetailsToServer()
        }
        else{
            props.showError('Please eneter valid parameters')
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <TextInput label="Team Name" id="teamName" placeholder="Enter team name" state={details.teamName} handleChange={handleChange}/>
                <TextInput label="Player Username" id="playerName" placeholder="Enter player username" state={details.playerName} handleChange={handleChange}/>
                <TimePicker startDate={startDate} setStartDate={setStartDate}/>
                <div className="form-group text-left">
                <label>Event type:</label>
                <div className="form-group text-center">
                    <select id="eventType" value={details.eventType} onChange={handleChange} className="dropdown-toggle btn btn-primary">
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
                <NumberInput label="Game ID" id="gameId" placeholder="Enter in digits" state={details.gameId} handleChange={handleChange}/>
                <SubmitButton buttonText={buttonText} handleSubmitClick={handleSubmitClick}/>
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

export default withRouter(UpdateEvent);