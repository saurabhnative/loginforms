import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
