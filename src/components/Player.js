import React, { Component } from 'react';

import '../css/Player.css';

class Player extends Component {
  constructor(props){
    super(props);
    console.log(props);
    
  }

  componentDidMount(){
    console.log('Player Mounted')
    console.log(this.props,"from didmount")

    // keypress does not detect arrow keys
    document.addEventListener('keydown', (e) => {
      this.props.move(e);
    });
  }
  
  render(){
    let styles = {
      top:  this.props.pos.y + 12.5,
      left: this.props.pos.x + 12.5
    }
    return (
      <div className="player" style={styles}>
        {console.log(styles)}
      </div>
    );
  }
};

export default Player;