import './App.css';
import React, { useState, useEffect } from 'react';
import Aruco from './components/Aruco';
import Simulation from './components/Simulation';

function App() {

  const [dimensions, setDimensions] = useState({ 
    height: window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight,
    width: window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight
  });

  React.useEffect(() => {

    function handleResize() {
      setDimensions({
        height: window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight,
        width: window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div style={{ backgroundColor: "red", position: "absolute", top: "50%", left: "50%" }}>
      <Simulation dimensions={dimensions}/>
      <Aruco dimensions={dimensions}/>
    </div>
  );
}

export default App;
