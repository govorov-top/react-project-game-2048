const grid = [
    [2, 4, 0, 16],
    [0, 2, 0, 8],
    [2, 0, 0, 0],
    [2, 2, 0, 8],
];
function slideUp(grid) {
    for (let col = 0; col < 4; col++) {
        let currentRow = 0;
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== 0) {
                if (currentRow !== row) {
                    grid[currentRow][col] = grid[row][col];
                    grid[row][col] = 0;
                }
                currentRow++;
            }
        }
    }
}

function moveUp(grid) {
    let merged = new Array(4).fill(false).map(() => new Array(4).fill(false));

    // Шаг 1: Сдвиг всех чисел вверх
    slideUp(grid);

    // Шаг 2: Объединение одинаковых чисел
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (grid[row][col] === grid[row + 1][col] && !merged[row][col] && !merged[row + 1][col]) {
                grid[row][col] *= 2;
                grid[row + 1][col] = 0;
                merged[row][col] = true;
            }
        }
    }

    // Шаг 3: Снова сдвиг всех чисел вверх после объединения
    slideUp(grid);

    return grid;
}


const result = moveUp(grid);
for (const resultElement of result) {
    console.log(resultElement)
}