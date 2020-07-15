import React from 'react';

import '../css/Player.css';

const Player = (props) => {
  const styles = {
    top: props.y + 12.5,
    left: props.x + 12.5
  }

  return (
    <div className="player" style={styles} onKeyPress={props.move}>
      
    </div>
  );
};

export default Player;