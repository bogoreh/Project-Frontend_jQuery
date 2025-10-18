import React from 'react';
import Accordion from './components/Accordion/Accordion';
import './App.css';

function App() {
  const accordionData = [
    {
      title: "Section 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Section 2",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Section 3",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Section 4",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  return (
    <div className="App">
      <h1>Accordion Menu with React & jQuery</h1>
      <Accordion items={accordionData} />
    </div>
  );
}

export default App;