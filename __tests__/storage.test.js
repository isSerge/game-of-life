const createStorage = require('../storage')
const { createGrid } = require('../board')

describe('storage module ', () => {
    let storage

    beforeEach(() => {
        // creates board 5 x 5 and puts it to the storage
        storage = createStorage(createGrid(5))
    })

    afterEach(() => {
        storage = null
    })

    const emptyWorld = {
        cells: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        generation: 0,
    }

    it('should return cells and generation on getWorld', () => {
        expect(storage.getWorld()).toEqual(emptyWorld)
    })

    it('should update world', () => {
        const newWorld = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ]

        const expected = {
            cells: newWorld,
            generation: 1,
        }

        storage.updateWorld(newWorld, 1)

        expect(storage.getWorld()).toEqual(expected)
    })

    it('should return clients', () => {
        expect(storage.getClients()).toEqual([])
    })

    it('should add clients', () => {
        storage.addClient({ randomClient: true })

        expect(storage.getClients()).toHaveLength(1)
    })
})
