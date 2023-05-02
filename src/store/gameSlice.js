import { createSlice } from '@reduxjs/toolkit'
import {generateCellsAction} from "./actions/generateCellsAction";


const slideTilesInGroup = (group) => {
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
}
const slideTiles = (cellsObj,gridSize) => {

    for (const cellsObjElement of cellsObj) {
        slideTilesInGroup(cellsObjElement)
    }
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        cells: {},
        gridSize: 4,
        gridCount: 0,
        gridCountTile: 2,
        scope: 0,
    },
    reducers: {
        generateCells: generateCellsAction,
        moveUp: (state, action) => {
            for (let x = 0; x < state.gridSize; x++) {
                let y = 0;
                let currentID = `${x}_${y}`;
                let nextID = `${x}_${y + 1}`;
                if (state.cells[currentID].value === 0 || state.cells[currentID].value === state.cells[nextID].value){
                    // поглощаем
                    state.cells[currentID].value += state.cells[nextID].value;
                    state.cells[nextID].value = 0;

                    while (y < state.gridSize - 1) {

                        y++;
                    }
                }




                /*for (let y = 0; y < state.gridSize - 1; y++) {
                  let currentID = `${x}_${y}`;
                    let nextID = `${x}_${y + 1}`;
                    if (state.cells[currentID].value === 0 || state.cells[currentID].value === state.cells[nextID].value){
                        // поглощаем
                        state.cells[currentID].value += state.cells[nextID].value;
                        state.cells[nextID].value = 0;
                    }
                }*/
            }
            state.cells = {...state.cells}
        },
        moveRight: (state, action) => {
            for (let y = 0; y < state.gridSize; y++) {
                for (let x = state.gridSize - 1; x > 0; x--) {
                    let currentID = `${x}_${y}`;
                    let nextID = `${x - 1}_${y}`;
                    console.log(currentID,nextID)
                    if (state.cells[currentID].value === 0 || state.cells[currentID].value === state.cells[nextID].value){
                        // поглощаем
                        state.cells[currentID].value += state.cells[nextID].value;
                        state.cells[nextID].value = 0;
                    }
                }
            }
            state.cells = {...state.cells}
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
    },
});

export const {
    generateCells,
    moveUp,
    moveRight
} = gameSlice.actions

export default gameSlice.reducer