import React from 'react';
import CreatePoll from './components/create_poll';
import Navbar from './components/navbar';
// import Temp from './components/temp';

function App() {
  return (
    <div>
      <Navbar />
      <CreatePoll />
      {/* <Temp /> */}
    </div>
  );
}

export default App;
