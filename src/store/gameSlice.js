import { createSlice } from '@reduxjs/toolkit'
import {generateCellsAction} from "./actions/generateCellsAction";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        cells: [],
        gridSize: 4,
        gridCountTile: 2,
        scope: 0,
    },
    reducers: {
        generateCells: generateCellsAction,
        moveUp: (state, action) => {
            gameSlice.caseReducers.slideTiles(
                gameSlice.caseReducers.groupCellsByColumn(state)
            );
        },
        slideTiles: (state) => {
            state.forEach(group => gameSlice.caseReducers.slideTilesInGroup(group))
        },
        slideTilesInGroup: (group) => {
            for (let i = 1; i < group.length; i++) {
                if (group[i].isEmpty) continue;
                const cellWithTile = group[i];
                let targetCell;
                let j = i - 1;
                while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)){
                    targetCell = group[j];
                    j--;
                }
                if (!targetCell) continue;
                if (targetCell.isEmpty){
                    targetCell.linkTile(cellWithTile.linkedTile);
                }else {
                    targetCell.linkTileForMerge(cellWithTile.linkedTile);
                }
                cellWithTile.unlinkTile();
            }
        },
        groupCellsByColumn: (state) => {
            const cellsFiltered = state.cells.filter(cell => cell.type !== 'tile');
            const result = cellsFiltered.reduce((groupCells, cell) => {
                groupCells[cell.x] = groupCells[cell.x] || [];
                groupCells[cell.x][cell.y] = cell;
                return groupCells;
            }, []);
            return result;
        },
        updateCell: (state,action) => {
            state.cells = state.cells.map(cell => {
                if (cell.id === action.payload.id){
                    cell.isEmpty = false
                }
                return cell;
            });
        }
    },
});

export const {
    generateCells,
    moveUp,
    updateCell,

} = gameSlice.actions

export default gameSlice.reducer