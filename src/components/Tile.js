import React from 'react';

const Tile = (props) => {
    let border = '1px solid white';
    let border_t = (props.walls.n) ? border : '';
    let border_r = (props.walls.e) ? border : '';
    let border_b = (props.walls.s) ? border : '';
    let border_l = (props.walls.w) ? border : '';

    

    const styles = {
        top: props.y,
        left: props.x,
        borderTop: border_t, 
        borderRight: border_r, 
        borderBottom: border_b, 
        borderLeft: border_l, 
    }
    
    return (
        <div className="tile" style={styles}>
             {props.n}
        </div>
    );
};

export default Tile;