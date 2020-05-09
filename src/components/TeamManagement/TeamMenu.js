import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import {redirectToHome} from '../Redirect/Redirect'

function TeamMenu(props) {
    props.updateTitle('Team Management')
    return(
        <div className="mt-2">
            <MenuButton btnText="Change team status"></MenuButton>
            <MenuButton btnText="Add or remove fields"></MenuButton>
            <MenuButton btnText="Add or remove players"></MenuButton>
            <MenuButton btnText="Add or remove coach"></MenuButton>
            <MenuButton btnText="Finance"></MenuButton>
            <div className="mt-2">
                <span className="loginText" onClick={() => redirectToHome('', props.typeOfUser)}>Back to menu</span> 
            </div> 
        </div>      
    )
}

export default TeamMenu;