import React, { Component } from 'react';

import Tile from './Tile';
import '../css/Tile.css';

class Maze extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rerender: false, //re render to show maze, actual value does not matter
            isGameOver: false,
            numTiles: 5
        }

        //tile array
        this.tileData = [];

        this.RandomStartPoint = () => {
            //returning object
            let randomPoint = {};

            //game dimensions
            let maze = document.querySelector('#maze');
            let maze_w = maze.offsetWidth;
            let maze_h = maze.offsetHeight;

            //finding random points within game dimensions
            randomPoint.x = Math.floor(Math.random() * maze_w) + 1;
            randomPoint.y = Math.floor(Math.random() * maze_h) + 1;

            //return randomPoint
            return randomPoint;
        }

        //create a single tile data-set
        this.CreateTileData = (ndx) => {
            //create master tile data
            if (ndx === 0) {
                //create master tile data-set
                this.tileData.push(this.RandomStartPoint());
                console.log(this.tileData[0])
            } else {
                let prevTileData = '';
            }
        }
    } //</constuctor>

    componentDidMount = () => {
        for (let i = 0; i < this.state.numTiles; i++) {
            this.CreateTileData(i);
        }

        this.setState({
            render: !this.state.rerender
        })
    }

    render() {
        return (
            <div id="maze">
                {this.tileData.map( (t, index) => {
                    return( <Tile x={t.x} y={t.y} key={`t${index}`} /> )
                })}
            </div>
        );
    }
}

 export default Maze;