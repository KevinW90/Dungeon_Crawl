import React, { Component } from 'react';

import Tile from './Tile';
import '../css/Tile.css';

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGameOver: false,
            numTiles: 5
        }
    }
    render() {
        let tiles = [];
        let pt = 20;
        let pl = 20;
        for (let i = 0; i < this.state.numTiles; i++) {
            let res = {};
            res.x = pt + (50 * i);
            res.y = pl + (50 * i);

            tiles.push(res);
        }
        return (
            <div className="gameboard">
                {tiles.map( (t) => {
                    return( <Tile x={t.x} y={t.y} /> )
                })}
            </div>
        );
    }
}

 export default GameBoard;