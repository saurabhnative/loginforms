import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import { withRouter } from "react-router-dom";
import {redirectToLogin, gotoChangeStatus, gotoWatchLogs} from '../Redirect/Redirect'

function HomeSysAdmin(props) {
    props.updateTitle('Home')
    
    return(
        <div className="mt-2">
            <h1>
            Welcome System Administrator
            </h1>
            <MenuButton btnText="Remove Subscription"></MenuButton>
            <MenuButton btnText="Answer Complaints"></MenuButton>
            <MenuButton btnText="Change Team Status" handle={gotoChangeStatus}></MenuButton>
            <MenuButton btnText="Watch System Logs" handle={gotoWatchLogs}></MenuButton>
            {/* <MenuButton btnText="Edit personal details"></MenuButton> */}
            <MenuButton btnText="Log out" handle={redirectToLogin}></MenuButton>
        </div>      
    )
}

export default withRouter(HomeSysAdmin);