import React from 'react';
import './App.css';
import IPForm from './IPForm'; // Import the IPForm component

function App() {
  return (
    <div className="App">
      <h1>Find Netework ID & Broadcast ID</h1>
      <IPForm /> {/* Use the IPForm component */}
    </div>
  );
}

export default App;
