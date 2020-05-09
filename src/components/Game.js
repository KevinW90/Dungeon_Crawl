import React, { Component } from 'react';

import Tile from './Tile';
import '../css/Tile.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGameOver: false,
            numTiles: 5
        }

        //tile array
        this.tileData = [];

        this.RandomStartPoint = () => {
            //returning object
            let randomPoint = {};

            //game dimensions
            let game = document.querySelector('#game');
            let game_w = game.offsetWidth;
            let game_h = game.offsetHeight;

            //finding random points within game dimensions
            randomPoint.x = Math.floor(Math.random() * game_w) + 1;
            randomPoint.y = Math.floor(Math.random() * game_h) + 1;

            //return randomPoint
            return randomPoint;
        }

        //create a single tile data-set
        this.CreateTileData = () => {

        }
    } //</constuctor>

    componentDidMount = () => {
        console.log(this.RandomStartPoint());
    }

    render() {
        return (
            <div id="game">
                {this.tileData.map( (t) => {
                    return( <Tile x={t.x} y={t.y} /> )
                })}
            </div>
        );
    }
}

 export default Game;