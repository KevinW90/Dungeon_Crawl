#MAZE_WALKER game by Kevin Williams

maze generator {
    tile (cc) {
        create (fn)
        wall (fn)
    }

    maze (fc) {
        loop tile.create
    }

    player (cc) {
        state:
            location
            inv
        move (fn)
    }

    chest (cc) {
        state:
            location
            inv
    }
}