import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const [title, updateTitle] = useState('Register');
  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex justify-content-center">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm />
            </Route>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
