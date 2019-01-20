const { mode } = require('./utils')
const { patternNames } = require('./constants')
// const { floor, random } = Math

// const fillWithRandomData = grid =>
//     grid.map(x =>
//         x.map(() => {
//             if (floor(random() * 2)) {
//                 return '#000'
//             }
//             return 0
//         }),
//     )

const SIZE = 20

// create 2-dimensional array
const createGrid = size => new Array(size).fill(0).map(() => new Array(size).fill(0))

const isWithinBounds = v => v >= 0 && v < SIZE
const areWithinBounds = (x, y) => isWithinBounds(x) && isWithinBounds(y)

const getNeighbourCoordinates = (x, y) =>
    [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ].filter(xyArr => areWithinBounds(...xyArr))

const countNeighbours = (grid, rowIndex, colIndex) => {
    const neighbourCoordinates = getNeighbourCoordinates(rowIndex, colIndex)
    const neighbours = neighbourCoordinates.map(([x, y]) => grid[x][y])
    const dominantColor = mode(neighbours)
    const sum = neighbours.filter(x => x).length
    return [sum, dominantColor]
}

const getNextGeneration = grid =>
    grid.map((x, xIndex) =>
        x.map((_, yIndex) => {
            const cell = grid[xIndex][yIndex]
            const [neighbours, dominantColor] = countNeighbours(grid, xIndex, yIndex)

            if (cell === 0 && neighbours === 3) {
                return dominantColor
            } else if (cell !== 0 && (neighbours < 2 || neighbours > 3)) {
                return 0
            } else {
                return cell
            }
        }),
    )

const putCellOnCoordinates = (cells, x, y, color) =>
    cells.map((row, xIndex) =>
        row.map((cell, yIndex) => (x === xIndex && y === yIndex ? color : cell)),
    )

const putPatternOnCoordinates = (cells, x, y, color, pattern) => {
    const patternCoordinates = {
        [patternNames.BLINKER]: [[x - 1, y], [x, y], [x + 1, y]],
        [patternNames.TUB]: [[x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]],
        [patternNames.BOAT]: [[x - 1, y - 1], [x - 1, y], [x, y - 1], [x, y + 1], [x + 1, y]],
        [patternNames.GLIDER]: [[x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y]],
    }

    const coordinates = patternCoordinates[pattern]

    return cells.map((row, xIndex) =>
        row.map((cell, yIndex) => {
            const isMatch = ([x, y]) => x === xIndex && y === yIndex
            const isFound = !!coordinates.find(isMatch)
            return isFound ? color : cell
        }),
    )
}

module.exports = {
    getNextGeneration,
    createGrid,
    putCellOnCoordinates,
    // fillWithRandomData,
    putPatternOnCoordinates,
}
