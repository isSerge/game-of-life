// const { floor, random } = Math
// const fillWithRandomData = grid =>
//   grid.map(x => x.map(_ => floor(random() * 2)))

const SIZE = 20

// create 2-dimensional array
const createGrid = size => new Array(size).fill(0).map(_ => new Array(size).fill(0))

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

const countNeighbours = (grid, xIndex, yIndex) => {
    const neighbours = getNeighbourCoordinates(xIndex, yIndex)
    return neighbours.reduce((acc, [x, y]) => acc + grid[x][y], 0)
}

const getNextGeneration = grid =>
    grid.map((x, xIndex) =>
        x.map((_, yIndex) => {
            const cell = grid[xIndex][yIndex]
            const neighbours = countNeighbours(grid, xIndex, yIndex)

            if (cell === 0 && neighbours === 3) {
                return 1
            } else if (cell === 1 && (neighbours < 2 || neighbours > 3)) {
                return 0
            } else {
                return cell
            }
        }),
    )

// export const grid =
//   // fillWithRandomData(
//   createGrid(SIZE)
// // )

const putCellOnCoordinates = (cells, x, y, color) =>
    cells.map((row, xIndex) =>
        row.map((cell, yIndex) => {
            if (x === xIndex && y === yIndex) {
                return color
            }
            return cell
        }),
    )

module.exports = {
    getNextGeneration,
    createGrid,
    putCellOnCoordinates,
}
