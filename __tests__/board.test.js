const {
    createGrid,
    getNeighbourCoordinates,
    countNeighbours,
    putCellOnCoordinates,
} = require('../board')

describe('board module', () => {
    it('createGrid should create two-dimensional array based on SIZE value provided', () => {
        const SIZE = 10
        const grid = createGrid(SIZE)

        expect(grid).toHaveLength(SIZE)

        grid.map(x => {
            expect(x).toHaveLength(SIZE)
        })
    })

    describe('getNeighbourCoordinates method (given default board size 20)', () => {
        it('should return 8 neigbours for non-marginal dot', () => {
            expect(getNeighbourCoordinates(0, 0)).toHaveLength(3)
        })

        it('should return 3 neigbours for the first marginal dot in the first array', () => {
            expect(getNeighbourCoordinates(0, 0)).toHaveLength(3)
        })

        it('should return 3 neigbours for the last marginal dot in the first array', () => {
            expect(getNeighbourCoordinates(0, 19)).toHaveLength(3)
        })

        it('should return 3 neigbours for the last marginal dot in the last array', () => {
            expect(getNeighbourCoordinates(19, 19)).toHaveLength(3)
        })

        it('should return 3 neigbours for the first marginal dot in the last array', () => {
            expect(getNeighbourCoordinates(19, 0)).toHaveLength(3)
        })

        it('should return 5 neigbours for the marginal dot in the first array which is neither first nor last', () => {
            expect(getNeighbourCoordinates(0, 1)).toHaveLength(5)
        })

        it('should return 5 neigbours for the marginal dot in the last array which is neither first nor last', () => {
            expect(getNeighbourCoordinates(19, 18)).toHaveLength(5)
        })
    })

    describe('countNeighbours method', () => {
        it('should return neighbours count and dominant color', () => {
            const board = [[0, 0, '#000'], [0, '#fff', '#fff'], [0, '#fff', 0]] // 3 x 3 board

            expect(countNeighbours(board, 1, 1)).toEqual([3, '#fff'])
        })

        it('should return "0" neighbours count and "null" dominant color if no neighbours', () => {
            const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // 3 x 3 board

            expect(countNeighbours(board, 1, 1)).toEqual([0, null])
        })
    })

    describe('putCellOnCoordinates method', () => {
        it('should return new board with dot placed on coordinates provided', () => {
            const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // 3 x 3 board
            const expected = [['#fff', 0, 0], [0, 0, 0], [0, 0, 0]]
            expect(putCellOnCoordinates(board, 0, 0, '#fff')).toEqual(expected)
        })
    })
})
