export const generateCellsAction = (state) => {
    const gridCount = Math.pow(state.gridSize,2);

    for (let i = 0; i < gridCount + state.gridCountTile; i++) {
        const x = i % state.gridSize;
        const y = Math.floor(i / state.gridSize);
        const id = `${x}_${y}`;
        const existingCell = state.cells.find((cell) => cell.id === id);
        if (!existingCell){
            state.cells.push({id, x, y, isEmpty: true});
        }
    }

    /*for (let i = gridCount; i < gridCount + state.gridCountTile; i++) {
        const id = `${i}_cell`;
        const existingCell = state.cells.find((cell) => cell.id === id);
        if (!existingCell){

            state.cells.push({
                id: id,
                type: 'tile',
                x: x,
                y: y,
                isEmpty: false,
            });
        }
    }*/
}