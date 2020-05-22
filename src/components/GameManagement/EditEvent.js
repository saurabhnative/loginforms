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
        request = "createnewevent"
        props.updateTitle('Add event to game')
        buttonText = "Add event"
    }
    else{
        request = "editgameevent"
        props.updateTitle('Update existing event in game')
        buttonText = "Update event in game"
    }
    const [startDate, setStartDate] = useState(new Date());
    const [details , setDetails] = useState({
        teamName : "",
        playerName : "",
        eventType : "goal",
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
                <TimePicker startDate={startDate} setStartDate={setStartDate} display={props.newSeason ? 'none' : 'block' }/>
                <div className="form-group text-left">
                <label>Event type:</label>
                <div className="form-group text-center">
                    <select id="eventType" value={details.eventType} onChange={handleChange} className="dropdown-toggle btn btn-primary">
                        <option value="goal" className="form-control">Goal</option>
                        <option value="offside" className="form-control">Offside</option>
                        <option value="foul" className="form-control">Foul</option>
                        <option value="red_ticket" className="form-control">Red Ticket</option>
                        <option value="yellow_ticket" className="form-control">Yellow Ticket</option>
                        <option value="injury" className="form-control">Injury</option>
                        <option value="player_replacement" className="form-control">Player Replacement</option>                        
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