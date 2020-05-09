import React, {useState} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Router, Switch, Route} from "react-router-dom"
import AlertComponent from './components/AlertComponent/AlertComponent'
import history from "../src/components/history"

// pages:
  // entrance:
import LoginForm from './components/LoginForm/LoginForm'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
  // home pages:
import HomeUnionRepresentative from './components/Home/HomeUR'
import HomeGuest from './components/Home/HomeGuest'
import HomeTeamOwner from './components/Home/HomeTO'
import HomeTeamManager from './components/Home/HomeTM'
  // functionalities:
import AddLeague from './components/LeagueManagement/AddALeague'
import TeamMenu from './components/TeamManagement/TeamMenu'
import CreateTeam from './components/TeamManagement/CreateTeam'
import ApproveTeamCreation from './components/TeamManagement/ApproveTeamCreation'
import ChangeTeamStatus from './components/TeamManagement/ExistingTeam/ChangeTeamStatus'
import AddRemoveObject from './components/TeamManagement/ExistingTeam/AddRemoveObject'
import AddRole from './components/TeamManagement/AddRole'
import AddPermissionsToTM from './components/TeamManagement/AddPermissionsToTM'
import NavigateInRoles from './components/TeamManagement/NavigateInRoles'


function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  const [typeOfUser, updateType] = useState(null)
  return (
    <Router history={history}>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/home/unionrepresentative">
              <HomeUnionRepresentative updateTitle={updateTitle} updateTypeOfUser={updateType}/>
            </Route>
            <Route path="/home/teamowner">
              <HomeTeamOwner updateTitle={updateTitle} updateTypeOfUser={updateType}/>
            </Route>
            <Route path="/home/teammanager">
              <HomeTeamManager updateTitle={updateTitle} updateTypeOfUser={updateType}/>
            </Route>
            <Route path="/home/guest">
              <HomeGuest updateTitle={updateTitle} updateTypeOfUser={updateType}/>
            </Route>
            <Route path='/home/addleague'>
              <AddLeague updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/team'>
              <TeamMenu updateTitle={updateTitle} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/createteam'>
              <CreateTeam updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/approveteam'>
              <ApproveTeamCreation updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/changeteamstatus'>
              <ChangeTeamStatus updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/addremove'>
              <AddRemoveObject updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/addrole'>
              <AddRole updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/addpermissionstm'>
              <AddPermissionsToTM updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
            <Route path='/home/navigaterole'>
              <NavigateInRoles updateTitle={updateTitle} showError={updateErrorMessage} typeOfUser={typeOfUser}/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;
