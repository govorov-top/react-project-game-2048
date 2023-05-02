import {StyledTile} from "./styled/CellTileStyled";
import {useDispatch, useSelector} from "react-redux";
import {updateCell} from "../store/gameSlice";
import {useEffect} from "react";

const CellTile = () => {
    const game = useSelector(state => state.game);
    const dispatchAction = useDispatch();

    let randomEmptyCell = [];
    const emptyCells = game.cells.filter(cell => cell.isEmpty);
    if (emptyCells){
        const randomEmptyCellIndex =  Math.floor(Math.random() * emptyCells.length);
        randomEmptyCell = emptyCells[randomEmptyCellIndex];
    }

    const {x, y} = randomEmptyCell;
    const value = Math.random() > 0.5 ? 2 : 4;
    const bgLightness = 100 - Math.log2(value) * 9;
    dispatchAction(updateCell(randomEmptyCell));

    return (
        <StyledTile props={{
            x,
            y,
            bgLightness: bgLightness,
        }}>{value}</StyledTile>
    );
}

export default CellTile;