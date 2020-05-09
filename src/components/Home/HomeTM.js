import React from 'react';
import MenuButton from '../MenuButton/MenuButton'

function HomeTeamManager(props) {
    const handle = () => {
        console.log("in handle for add a league")
    }
    return(
        <div className="mt-2">
            Welcome Union Representative
            <MenuButton btnText="Add a league" handle={handle()}></MenuButton>
            <MenuButton btnText="Add a season"></MenuButton>
            <MenuButton btnText="Manage referees"></MenuButton>
            <MenuButton btnText="Update score policy"></MenuButton>
            <MenuButton btnText="Manage games"></MenuButton>
            <MenuButton btnText="Finance"></MenuButton>
            <MenuButton btnText="Log out"></MenuButton>
        </div>
    )
}

export default HomeTeamManager;