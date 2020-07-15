import React from 'react';

import Tile from './Tile';

const Maze = ({tileData}) => {
  return (
    <>
      {tileData.map( (t, index) => {
          return( <Tile x={t.x} 
                        y={t.y} 
                        width={this.tileSize}
                        height={this.tileSize} 
                        walls={t.w}
                        key={`t${index}`} /> )
        })}
    </>
  );
};

export default Maze;