import React from 'react'
import {useSelector} from "react-redux";

import Cell from "./Cell";
import CellTile from "./CellTile";

const Cells = () => {
    const cells = useSelector(state => state.game.cells);
    const coordinateCells = useSelector(state => state.game.coordinateCells);
    return (
        <>
            {
                cells.flat().map(cell =>  <Cell key={cell.id} {...cell}/>)
            }
            {
                Object.entries(coordinateCells).map(cell => <CellTile key={cell[1].id} {...cell[1]}/>)
            }
        </>
    );
}

export default Cells;