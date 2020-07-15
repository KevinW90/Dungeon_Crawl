import React, { Component } from 'react';

import Tile from './Tile';
import '../css/Tile.css';

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isGameOver: false,
        mode: ''
    }

    //number of tiles (set from DidMount)
    this.numtiles = 0;
    //game dimensions (set from DidMount)
    this.maze = '';
    this.maze_w = '';
    this.maze_h = '';
    //tile size (set from DidMount)
    this.tileSize = 0;
    //tile data array (set from AddTileData)
    this.tileData = [];
    //direction array
    this.directions = ['n','s','e','w'];

    //random number generator [min, max]
    this.RNG = (min,max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.RandomStartPoint = () => {
      //returning object
      let randomPoint = {};

      //finding random points within game dimensions
      randomPoint.x = this.RNG(0,this.maze_w);
      randomPoint.y = this.RNG(0,this.maze_h);

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
                
        //set directional offsets
        switch (dir) {
          case "n":
            xoff = 0;
            yoff = -this.tileSize; 
            break;
          case "e":
            xoff = this.tileSize; 
            yoff = 0;
            break;
          case "s":
            xoff = 0;
            yoff = this.tileSize; 
            break;
          case "w":
            xoff = -this.tileSize; 
            yoff = 0;
            break;
          default:
            xoff = null;
            yoff = null;
        }
      }

      //set tile data
      let newTileData = {x: prevTileData.x + xoff, 
                          y: prevTileData.y + yoff}
      return newTileData;
    }

    this.AddTileData = () => {
      //for numTiles times
      for (let i = 0; i < this.numTiles; i++) {
        //create new tile data
        let newTileData = this.CreateTileData(i);
        
        //data creation counter to limit attempts due to blockages
        let creationCounter = 1;
        while (this.TileDataExists(newTileData) || 
                this.TileIsOffScreen(newTileData)) {
          creationCounter++; //increase creation counter
          //if creation counter > 6
          if (creationCounter > 6) {
            //create new tile data from a random tile data
            let randomTile = this.RNG(0,this.tileData.length - 1);
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
      return (newTileData.x < 0 ||
              newTileData.x > this.maze_w - this.tileSize ||
              newTileData.y < 0 ||
              newTileData.y > this.maze_h - this.tileSize);
    }

    this.AddWalls = () => {
      for (let i = 0; i < this.tileData.length; i++) {
        let t = this.tileData[i];

        //tile neighbor set
        let tn = { x: t.x, y: t.y - this.tileSize};
        let te = { x: t.x + this.tileSize, y: t.y};
        let ts = { x: t.x, y: t.y + this.tileSize};
        let tw = { x: t.x - this.tileSize, y: t.y};

        //check if neighbor exists
        let n = (this.TileDataExists(tn)) ? false : true;
        let e = (this.TileDataExists(te)) ? false : true;
        let s = (this.TileDataExists(ts)) ? false : true;
        let w = (this.TileDataExists(tw)) ? false : true;

        //add 'walls' object to the tile data
        t.w = {n, e, s, w};
      }
    }
  } //</constuctor>

  componentDidMount = () => {
    //game dimensions
    this.maze = document.querySelector('#maze');
    this.maze_w = this.maze.offsetWidth;
    this.maze_h = this.maze.offsetHeight;
    console.log(this.maze_w);
    console.log(this.maze_h);

    //tile size based on maze width (screen width)
    if (this.maze_w >= 1200) this.tileSize = 50;
    else if (this.maze_w >= 768) this.tileSize = 40;
    else if (this.maze_w >= 600) this.tileSize = 25;
    else this.tileSize = 20;

    console.log(this.tileSize);

    let maxTilesHor = Math.floor(this.maze_w / this.tileSize);
    let maxTilesVer = Math.floor(this.maze_h / this.tileSize);
    this.numTiles = Math.floor((maxTilesHor * maxTilesVer) * .65);
    console.log(this.numTiles);
    console.log(maxTilesHor);
    console.log(maxTilesVer);


    this.AddTileData();
    
    this.forceUpdate(); //shows tiles
    this.AddWalls();
  }

  render() {
    return (
      <>
        {this.tileData.map( (t, index) => {
          return( <Tile x={t.x} 
                        y={t.y} 
                        width={this.tileSize}
                        height={this.tileSize} 
                        walls={t.w}
                        key={`t${index}`} /> )
        })}
      </>
    );
  }
}

 export default Maze;