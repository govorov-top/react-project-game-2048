import React from 'react'
import {useSelector} from "react-redux";

import Cell from "./Cell";
import CellTile from "./CellTile";

const Cells = () => {
    const game = useSelector(state => state.game);
    const cells = Object.values(game.cells);

    return (
        <>
            {
                cells.map(cell => <React.Fragment key={cell.id}>
                    <Cell {...cell}/>
                    <CellTile {...cell}/>
                </React.Fragment>)
            }
        </>
    );
}

export default Cells;