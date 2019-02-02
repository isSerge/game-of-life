const { mode } = require('./utils')
const { patternNames, SIZE } = require('./constants')

// grid is a 2-dimensional array
const createGrid = size => new Array(size).fill(0).map(() => new Array(size).fill(0))

// utils to check if dots are within board
const isWithinBoard = v => v >= 0 && v < SIZE
const areWithinBoard = (x, y) => isWithinBoard(x) && isWithinBoard(y)

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
    ].filter(xyArr => areWithinBoard(...xyArr))

// returns pair - sum of neighbours and dominant color
const countNeighbours = (grid, rowIndex, colIndex) => {
    const neighbourCoordinates = getNeighbourCoordinates(rowIndex, colIndex)
    const neighbours = neighbourCoordinates.map(([x, y]) => grid[x][y])
    const dominantColor = mode(neighbours)
    const sum = neighbours.filter(x => x).length
    return [sum, dominantColor]
}

// returns new generation on cells based on Game of Life rules
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
    putPatternOnCoordinates,
}
