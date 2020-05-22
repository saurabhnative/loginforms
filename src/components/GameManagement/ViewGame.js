import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {goBack} from '../Redirect/Redirect'
import SubmitButton from '../InputFields/SubmitButton';
import NumberInput from '../InputFields/NumberInput';

class ViewGame extends Component{
    
    state = {
        gameDetails : [],
        displayGameDetails : ["No game was selected yet"],
        gameId : "",
        successMessage : null
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)

        
    }

    handleChange(e){
        const {id , value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    sendGameId(gameId){
        new Promise((resolved, rejected) => {
            try{
                axios.get(API_BASE_URL+'watchgameevent/'+gameId)
                    .then(response => {
                        if(response.status === 200){
                            console.log(response)
                            let list = response.data;
                            return list
                
                        }else{
                            rejected("No response")
                        }
                
                      })
                      .then(list => {
                        this.setState(prevState => ({
                            ...prevState,
                            'gameDetails' : list
                        }))
                        return list;                
                      })
                    .then(result => {
                        // verify the result is valid and not empty
                        if(result && result[0] !== ""){
                            this.setState(prevState => ({
                                ...prevState,
                                'displayGameDetails' : result.map((event)=>{
                                    return (
                                        <div className="form-group">
                                            <label>{event}</label>
                                        </div>
                                    );
                                })
                            }))
                        }
                        else { 
                            // result is undefined -> did not get a response from the server
                            this.setState(prevState => ({
                                ...prevState,
                                'displayGameDetails' :  ['There are no events in the selected game']
                            }))
                        }
                    })
                    .catch(error => {
                        this.setState(prevState => ({
                            ...prevState,
                            'displayGameDetails' :  ['There are no events in the selected game']
                        }))
                    })          
            } catch (e) {
                rejected(e)
            }
        })
    }
    
    handleSubmitClick(){
        if(this.state.gameId.length) {
            this.sendGameId(this.state.gameId)    
        } else {
            this.props.showError('Please enter a valid game ID');
        }
    }

    render() {
        this.props.updateTitle('Watch Game Events')
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <NumberInput label="Enter game ID" id="gameId" placeholder="Enter in digits" state={this.state.gameId} handleChange={this.handleChange}/>
                    <SubmitButton handleSubmitClick={this.handleSubmitClick} buttonText="Watch events"/>
                    <div className="form-group text-left">
                    <label className="row">Game Events:</label>
                    {this.state.displayGameDetails}
                    </div>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="mt-2">
                    <span className="loginText" onClick={() => goBack()}>Back to menu</span> 
                </div>            
            </div>
        )
    }
}

export default withRouter(ViewGame);