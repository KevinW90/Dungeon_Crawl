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

        //tile data array
        this.tileData = [];
        //direction array
        this.directions = ['n','s','e','w'];

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
            } else {
                let dir = this.ChooseTileDirection();
                let prevTileData = this.tileData[ndx - 1];
                
                //set tile data from direction
                let xoff, yoff;
                switch (dir) {
                    case "n":
                        xoff = 0;
                        yoff = -50; 
                        break;
                    case "e":
                        xoff = 50; 
                        yoff = 0;
                        break;
                    case "s":
                        xoff = 0;
                        yoff = 50; 
                        break;
                    case "w":
                        xoff = -50; 
                        yoff = 0;
                        break;
                    default:
                        xoff = null;
                        yoff = null;
                }

                let newTileData = {x: prevTileData.x + xoff, 
                                   y: prevTileData.y + yoff};

                this.tileData.push(newTileData);
            }
        }

        //choose a direction in which to add new tile data
        this.ChooseTileDirection = () => {
            let dirSlot = Math.floor(Math.random() * 4);
            console.log(this.directions[dirSlot]);
            return this.directions[dirSlot];
        }
    } //</constuctor>

    componentDidMount = () => {
        for (let i = 0; i < this.state.numTiles; i++) {
            this.CreateTileData(i);
        }

        this.setState({
            render: !this.state.rerender
        })

        console.log(this.tileData);
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