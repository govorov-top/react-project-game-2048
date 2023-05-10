import { createSlice } from '@reduxjs/toolkit'


const generateRandomCells = (cells,gridCountTile) => {
    const getEmptyTiles = () => {
       return cells.flat().filter(cell => !cell.value)
    }
    if (getEmptyTiles().length){
        for (let i = 0; i < gridCountTile; i++) {
            const emptyTiles = getEmptyTiles();
            const randomIndex = Math.floor(Math.random() * emptyTiles.length);
            const cell = cells.flat()[randomIndex];

            if (!cell.value) {
                cell.value = Math.random() < 0.5 ? 2 : 4;
            }
        }
    }
    return cells;
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        cells: [],
        coordinateCells: {},
        gridSize: 4,
        gridCount: 0,
        gridCountTile: 2,
        scope: 0,
    },
    reducers: {
        generateCells: (state) => {
            state.gridCount = Math.pow(state.gridSize,2); // 16;

            let cells = [];
            for (let column = 0; column < state.gridSize; column++) {
                cells[column] = [];
                for (let row = 0; row < state.gridSize; row++) {
                    cells[column][row] = {
                        id: `${row}_${column}`,
                        x: row % state.gridSize,
                        y: column,
                        value: 0
                    };
                }
            }

            state.cells = generateRandomCells(cells, state.gridCountTile);

            let newObj = {};
            cells.flat().forEach(el => newObj[el.id] = {...el});
            state.coordinateCells = {...newObj};
        },
        moveUp: (state, action) => {
            const grid = state.cells;
            console.log(JSON.parse(JSON.stringify(grid)))
            const gridSize = state.gridSize;

            let merged = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));

            // Шаг 1: Сдвиг всех чисел вверх
            slideUp(grid,gridSize);

            // Шаг 2: Объединение одинаковых чисел
            for (let col = 0; col < gridSize; col++) {
                for (let row = 0; row < gridSize - 1; row++) {
                    if (grid[row][col].value === grid[row + 1][col].value && !merged[row][col] && !merged[row + 1][col]) {
                        grid[row][col].value *= 2;
                        grid[row + 1][col].value = 0;
                        merged[row][col] = true;
                    }
                }
            }

            // Шаг 3: Снова сдвиг всех чисел вверх после объединения
            slideUp(grid,gridSize);

            state.cells = generateRandomCells(grid, state.gridCountTile);

            let newObj = {};
            grid.flat().forEach(el => newObj[el.id] = {...el});
            state.coordinateCells = {...newObj};
        },
        moveDown: (state, action) => {
            const grid = state.cells;
            const gridSize = state.gridSize;

            let merged = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));

            // Шаг 1: Сдвиг всех чисел вниз
            slideDown(grid, gridSize);

            // Шаг 2: Объединение одинаковых чисел
            for (let col = 0; col < gridSize; col++) {
                for (let row = gridSize - 1; row > 0; row--) {
                    if (grid[row][col].value === grid[row - 1][col].value && !merged[row][col] && !merged[row - 1][col]) {
                        grid[row][col].value *= 2;
                        grid[row - 1][col].value = 0;
                        merged[row][col] = true;
                    }
                }
            }

            // Шаг 3: Снова сдвиг всех чисел вниз после объединения
            slideDown(grid, gridSize);

            state.cells = generateRandomCells(grid, state.gridCountTile);

            let newObj = {};
            grid.flat().forEach(el => newObj[el.id] = {...el});
            state.coordinateCells = {...newObj};
        },
        moveRight: (state, action) => {
            const grid = state.cells;
            const gridSize = state.gridSize;

            let merged = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));

            // Шаг 1: Сдвиг всех чисел вправо
            slideRight(grid, gridSize);

            // Шаг 2: Объединение одинаковых чисел
            for (let row = 0; row < gridSize; row++) {
                for (let col = gridSize - 1; col > 0; col--) {
                    if (grid[row][col].value === grid[row][col - 1].value && !merged[row][col] && !merged[row][col - 1]) {
                        grid[row][col].value *= 2;
                        grid[row][col - 1].value = 0;
                        merged[row][col] = true;
                    }
                }
            }

            // Шаг 3: Снова сдвиг всех чисел вправо после объединения
            slideRight(grid, gridSize);

            state.cells = generateRandomCells(grid, state.gridCountTile);

            let newObj = {};
            grid.flat().forEach(el => newObj[el.id] = {...el});
            state.coordinateCells = {...newObj};
        },
        moveLeft: (state, action) => {
            const grid = state.cells;
            const gridSize = state.gridSize;

            let merged = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));

            // Шаг 1: Сдвиг всех чисел влево
            slideLeft(grid, gridSize);

            // Шаг 2: Объединение одинаковых чисел
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize - 1; col++) {
                    if (grid[row][col].value === grid[row][col + 1].value && !merged[row][col] && !merged[row][col + 1]) {
                        grid[row][col].value *= 2;
                        grid[row][col + 1].value = 0;
                        merged[row][col] = true;
                    }
                }
            }

            // Шаг 3: Снова сдвиг всех чисел влево после объединения
            slideLeft(grid, gridSize);

            state.cells = generateRandomCells(grid, state.gridCountTile);

            let newObj = {};
            grid.flat().forEach(el => newObj[el.id] = {...el});
            state.coordinateCells = {...newObj};
        },
    },
});

function slideUp(grid,gridSize) {
    for (let col = 0; col < gridSize; col++) {
        let currentRow = 0;
        for (let row = 0; row < gridSize; row++) {
            if (grid[row][col].value !== 0) {
                if (currentRow !== row) {
                    grid[currentRow][col].value = grid[row][col].value;
                    grid[row][col].value = 0;
                }
                currentRow++;
            }
        }
    }
}
function slideDown(grid, gridSize) {
    for (let col = 0; col < gridSize; col++) {
        for (let row = gridSize - 1; row >= 0; row--) {
            let newRow = row;
            while (newRow < gridSize - 1 && grid[newRow + 1][col].value === 0) {
                grid[newRow + 1][col].value = grid[newRow][col].value;
                grid[newRow][col].value = 0;
                newRow++;
            }
        }
    }
}
function slideRight(grid, gridSize) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = gridSize - 1; col >= 0; col--) {
            let newCol = col;
            while (newCol < gridSize - 1 && grid[row][newCol + 1].value === 0) {
                grid[row][newCol + 1].value = grid[row][newCol].value;
                grid[row][newCol].value = 0;
                newCol++;
            }
        }
    }
}
function slideLeft(grid, gridSize) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let newCol = col;
            while (newCol > 0 && grid[row][newCol - 1].value === 0) {
                grid[row][newCol - 1].value = grid[row][newCol].value;
                grid[row][newCol].value = 0;
                newCol--;
            }
        }
    }
}

export const {
    generateCells,
    moveUp,
    moveDown,
    moveRight,
    moveLeft,
} = gameSlice.actions

export default gameSlice.reducer