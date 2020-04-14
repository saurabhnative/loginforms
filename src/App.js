import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <Header />
        <div className="container d-flex justify-content-center">
          <Switch>
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
