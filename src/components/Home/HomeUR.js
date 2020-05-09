import React from 'react';
import MenuButton from '../MenuButton/MenuButton'
import {redirectToLogin, gotoAddLeague, gotoApproveTeam} from '../Redirect/Redirect'
import {ur} from '../../constants/apiContants'


function HomeUnionRepresentative(props) {
    props.updateTitle('Home')
    props.updateTypeOfUser(ur)


    return(
        <div className="mt-2">
            <h1>
            Welcome Union Representative
            </h1>
            <MenuButton btnText="Add a league" handle={gotoAddLeague}></MenuButton>
            <MenuButton btnText="Add a season"></MenuButton>
            <MenuButton btnText="Update score policy"></MenuButton>
            <MenuButton btnText="Update games scheduling policy"></MenuButton>
            <MenuButton btnText="Manage referees"></MenuButton>
            <MenuButton btnText="Manage games"></MenuButton> {/* ????? */}
            <MenuButton btnText="Approve team creation" handle={gotoApproveTeam}></MenuButton>
            <MenuButton btnText="Finance"></MenuButton> {/* ????? */}
            <MenuButton btnText="Log out" handle={redirectToLogin}></MenuButton>
        </div>      
    )
}

export default HomeUnionRepresentative;