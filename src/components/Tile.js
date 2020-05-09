import React, { Component } from 'react';

class Tile extends Component {
    constructor(props) {
        super(props);
    } //</constructor>

    
    render() {
        const styles = {
            top: this.props.y,
            left: this.props.x
        }

        return (
            <div className="tile" style={styles}>
                
            </div>
        );
    }
}

export default Tile;