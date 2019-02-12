const { topics, BOARD_SIZE, TICK_INTERVAL } = require('./constants')
const {
    getNextGeneration,
    putCellOnCoordinates,
    putPatternOnCoordinates,
    createGrid,
} = require('./board')

const createService = (storage, connection) => {
    let ticksInterval

    // when new client connects it makes initial request to get generated color and board of cells
    const handleInitialRequest = () => {
        const { color } = storage.getCurrentClient(connection)
        const world = storage.getWorld()

        connection.send(
            JSON.stringify({
                topic: topics.INITIAL_RESPONSE,
                data: {
                    color,
                    ...world,
                },
            }),
        )
    }

    const sendWorldUpdate = (clients, world) => {
        clients.forEach(({ connection }) => {
            connection.send(
                JSON.stringify({
                    topic: topics.WORLD_UPDATE,
                    data: world,
                }),
            )
        })
    }

    const placeCells = msg => {
        const { x, y, color, pattern } = msg.data
        const { cells, generation } = storage.getWorld()
        const clients = storage.getClients()

        // if pattern is provided - place dots according to pattern, otherwise - place single dot
        const newCells = pattern
            ? putPatternOnCoordinates(cells, x, y, color, pattern)
            : putCellOnCoordinates(cells, x, y, color)

        storage.updateWorld(newCells)
        sendWorldUpdate(clients, { cells: newCells, generation })
    }

    const startTicks = () => {
        if (!ticksInterval) {
            ticksInterval = setInterval(nextTick, TICK_INTERVAL)
        }
    }

    const pauseTick = () => {
        clearInterval(ticksInterval)
        ticksInterval = 0
    }

    const refreshTicks = () => {
        pauseTick()
        const clients = storage.getClients()
        const newCells = createGrid(BOARD_SIZE)

        storage.updateWorld(newCells, 0)
        sendWorldUpdate(clients, { cells: newCells, generation: 0 })
    }

    const nextTick = () => {
        const { cells, generation } = storage.getWorld()
        const clients = storage.getClients()
        const newCells = getNextGeneration(cells)

        storage.updateWorld(newCells, generation + 1)
        sendWorldUpdate(clients, { cells: newCells, generation: generation + 1 })
    }

    return {
        handleInitialRequest,
        sendWorldUpdate,
        placeCells,
        startTicks,
        nextTick,
        pauseTick,
        refreshTicks,
    }
}

module.exports = createService
