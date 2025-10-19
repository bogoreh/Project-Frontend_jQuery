import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>User Registration</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;