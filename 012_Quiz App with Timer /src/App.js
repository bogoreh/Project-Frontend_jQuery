import React from 'react';
import Quiz from './components/Quiz';
import { quizData } from './data/quizData';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '2.5em' }}>
        🎯 Quiz Master
      </h1>
      <Quiz questions={quizData} timeLimit={60} />
    </div>
  );
}

export default App;