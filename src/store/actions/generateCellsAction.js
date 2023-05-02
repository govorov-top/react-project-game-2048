export const generateCellsAction = (state) => {
    const gridCount = Math.pow(state.gridSize,2); // 16
    state.gridCount = gridCount;
    let cells = {};

    for (let i = 0; i < gridCount; i++) {
        const x = i % state.gridSize;
        const y = Math.floor(i / state.gridSize);
        const id = `${x}_${y}`;
        cells[id] = ({id, x, y, value: 0});
    }

    //cells['0_0'].value = Math.random() > 0.5 ? 2 : 4;
    cells['0_0'].value = 0; // 2
    cells['0_1'].value = 2; // 2
    cells['0_2'].value = 0; // 0
    cells['0_3'].value = 2; // 0

    state.cells = cells;

}