import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import {redirectToRegister, redirectToLogin} from '../Redirect/Redirect'

function HomeGuest(props) {
    props.updateTitle('Home')
    return(
        <div className="mt-2">
            <h1>Welcome Guest</h1>
            <MenuButton btnText="Register" handle={redirectToRegister}></MenuButton>
            <MenuButton btnText="Login" handle={redirectToLogin}></MenuButton>
            <MenuButton btnText="Game Events"></MenuButton>
            <MenuButton btnText="Score Tables"></MenuButton>
            <MenuButton btnText="Players and Coaches Personal Pages"></MenuButton>
            <MenuButton btnText="Team Pages"></MenuButton>
        </div>
    )
}

export default HomeGuest;