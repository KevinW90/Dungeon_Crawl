import React from 'react';
import '../css/App.css';

import MazeManager from './MazeManager';
import '../css/Maze.css';

function App() {
  return (
    <div className="App">
      <div id="maze">
        <MazeManager />
      </div>  
    </div>
  );
}

export default App;
