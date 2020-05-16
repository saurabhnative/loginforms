import history from '../history';

export function redirectToHome (username, alreadyIn) {
    // props.updateTitle('Home')
    // we need to have a function here to get the type of user from the server and insert it into the useremail variant
    var kindofuser;
    if(alreadyIn !== ''){
        kindofuser = alreadyIn
    }
    else if(username !== ''){
        kindofuser = username //get from server the type of user
    }
    else{ //is a guest
        kindofuser = 'guest'
    }
    history.push(`/home/${kindofuser}`);
}

export function goBack(){
    history.goBack()
}

export function redirectToLogin(){
    history.push('/login'); 
}

export function redirectToRegister() {
    history.push('/register')
}

export function gotoAddLeague(){
    history.push('addleague')
}

export function gotoAddRole(){
    history.push('addRole')
}

export function gotoTeamMenu(){
    history.push('team')
}

export function gotoCreateTeam(){
    history.push('createteam')
}

export function gotoApproveTeam(){
    history.push('approveteam')
}

export function gotoChangeStatus(){
    history.push('changeteamstatus')
}

export function gotoAddRemove(){
    history.push('addremove')
}

export function gotoAddPermissionsTM(){
    history.push('addpermissionstm')
}

export function gotoNavigateRole(){
    history.push('navigaterole')
}

export function gotoUpdateSeason(){
    history.push('updateseason')
}

export function gotoSchedulingPolicy(){
    history.push('schedulingpolicy')
}

export function gotoAddTeamToLeague(){
    history.push('addteamtoleague')
}

export function gotoAddRemoveReferee(){
    history.push('addremovereferee')
}

export function gotoEditEvent(){
    history.push('editevent')
}