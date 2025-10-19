import React from 'react';
import Quiz from './components/Quiz';
import { quizData } from './data/quizData';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Interactive Quiz</h1>
        <p>Test your knowledge with this interactive quiz!</p>
      </header>
      <main className="app-main">
        <Quiz questions={quizData} />
      </main>
    </div>
  );
}

export default App;