import React, { Component } from 'react';

import Tile from './Tile';
import '../css/Tile.css';

class Maze extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGameOver: false,
            numTiles: 200,
            mode: ''
        }

        //tile data array
        this.tileData = [];
        //direction array
        this.directions = ['n','s','e','w'];

        //random number generator [min, max]
        this.RNG = (min,max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.RandomStartPoint = () => {
            //returning object
            let randomPoint = {};

            //game dimensions
            let maze = document.querySelector('#maze');
            let maze_w = maze.offsetWidth;
            let maze_h = maze.offsetHeight;

            //finding random points within game dimensions
            randomPoint.x = this.RNG(0,maze_w);
            randomPoint.y = this.RNG(0,maze_h);

            //return randomPoint
            return randomPoint;
        }

        //create a single tile data-set
        this.CreateTileData = (ndx) => {
            let prevTileData;
            let xoff, yoff;
            
            if (ndx === 0) {
                prevTileData = this.RandomStartPoint();
                xoff = 0;
                yoff = 0;
            } else {
                let dir = this.ChooseTileDirection();
                prevTileData = this.tileData[ndx - 1];
                    
                //set tile data from direction
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
            }

            let newTileData = {x: prevTileData.x + xoff, 
                                y: prevTileData.y + yoff}
            return newTileData;
        }

        this.AddTileData = () => {
            //for numTiles times
            for (let i = 0; i < this.state.numTiles; i++) {
                //create new tile data
                let newTileData = this.CreateTileData(i);
                
                //data creation counter to limit attempts due to blockages
                let creationCounter = 1;
                while (this.TileDataExists(newTileData) || this.TileIsOffScreen(newTileData)) {
                    creationCounter++; //increase creation counter
                    //if creation counter > 6
                    if (creationCounter > 6) {
                        console.log('creationCounter error');
                        //create new tile data from a random tile data
                        let randomTile = this.RNG(0,this.tileData.length - 1);
                        console.log(`on ${i} from ${randomTile}`);
                        //add 1 because CreateTileData() subtracts 1
                        newTileData = this.CreateTileData(randomTile + 1);
                    } else {
                        newTileData = this.CreateTileData(i);
                    }
                }
                this.tileData.push(newTileData);
            }
        }
        
        
        //choose a direction in which to add new tile data
        this.ChooseTileDirection = () => {
            let dirSlot = this.RNG(0,4);
            return this.directions[dirSlot];
        }

        this.TileDataExists = (newTileData) => {
            //for every tile data
            for (let i = 0; i < this.tileData.length; i++) {
                let t = this.tileData[i];
                //check the new tile data
                if (newTileData.x === t.x && newTileData.y === t.y) {
                    //new tile data exists
                    return true;
                }
            }

            //new tile data does not exist
            return false;
        }

        this.TileIsOffScreen = (newTileData) => {
            //game dimensions
            let maze = document.querySelector('#maze');
            let maze_w = maze.offsetWidth;
            let maze_h = maze.offsetHeight;

            return (newTileData.x < 0 ||
                    newTileData.x > maze_w - 50 ||
                    newTileData.y < 0 ||
                    newTileData.y > maze_h - 50);
        }
    } //</constuctor>

    componentDidMount = () => {
        this.AddTileData();
        this.forceUpdate();
        console.log(this.tileData);
    }

    render() {
        return (
            <div id="maze">
                {this.tileData.map( (t, index) => {
                    return( <Tile x={t.x} 
                                  y={t.y} 
                                  n={index} 
                                  key={`t${index}`} /> )
                })}
            </div>
        );
    }
}

 export default Maze;