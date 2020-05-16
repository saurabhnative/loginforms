import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import { withRouter } from "react-router-dom";
import {redirectToLogin, gotoEditEvent} from '../Redirect/Redirect'

function HomeReferee(props) {
    props.updateTitle('Home')
    
    return(
        <div className="mt-2">
            <h1>
            Welcome Referee
            </h1>
            <MenuButton btnText="Save game"></MenuButton>
            <MenuButton btnText="Create new event"></MenuButton>
            <MenuButton btnText="Edit event" handle={gotoEditEvent}></MenuButton>
            <MenuButton btnText="View game"></MenuButton>
            <MenuButton btnText="Edit personal details"></MenuButton>
            <MenuButton btnText="Log out" handle={redirectToLogin}></MenuButton>
        </div>      
    )
}

export default withRouter(HomeReferee);