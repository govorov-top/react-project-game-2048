import {useSelector} from "react-redux";

import Cell from "./Cell";
import CellTile from "./CellTile";

const Cells = () => {
    const game = useSelector(state => state.game);
    return (
        <>
            {
                game.cells.map((cell, i) => {
                    if (i < game.gridCountTile){
                        return <CellTile key={cell.id} {...cell}/>
                    }else {
                        return <Cell key={cell.id} {...cell}/>
                    }
                })
            }
        </>
    );
}

export default Cells;