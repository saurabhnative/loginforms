import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import {redirectToLogin, gotoAddRole, gotoTeamMenu, gotoCreateTeam} from '../Redirect/Redirect'

function HomeTeamOwner(props) {
    props.updateTitle('Home')
    props.updateTypeOfUser('teamowner')

/// need to check if they have a team -> if not, display a msg. if yes-> redirect to page
    
    return(
        <div className="mt-2">
            <h1>
            Welcome Team Owner
            </h1>
            <MenuButton btnText="Add a user type to your user" handle={gotoAddRole}></MenuButton>
            <MenuButton btnText="Create a team" handle={gotoCreateTeam}></MenuButton>
            <MenuButton btnText="Manage existing team" handle={gotoTeamMenu}></MenuButton>
            <MenuButton btnText="Add permissions to a team manager"></MenuButton>
            <MenuButton btnText="Add or remove team owner"></MenuButton>
            <MenuButton btnText="Add or remove team manager"></MenuButton>
            <MenuButton btnText="Log out" handle={redirectToLogin}></MenuButton>
        </div>      
    )
}

export default HomeTeamOwner;