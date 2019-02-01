const { topics } = require('./constants')
const {
    getNextGeneration,
    putCellOnCoordinates,
    putPatternOnCoordinates,
    createGrid,
} = require('./board')

const createController = (storage, connection) => {
    let ticksInterval

    const handleInitialRequest = () => {
        const clients = storage.getClients()
        const { color } = clients.find(cl => cl.connection === connection)
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
        const newCells = pattern
            ? putPatternOnCoordinates(cells, x, y, color, pattern)
            : putCellOnCoordinates(cells, x, y, color)
        storage.updateWorld(newCells)
        const clients = storage.getClients()
        sendWorldUpdate(clients, { cells: newCells, generation })
    }

    const startTicks = () => {
        if (!ticksInterval) {
            ticksInterval = setInterval(nextTick, 1000)
        }
    }

    const nextTick = () => {
        const { cells, generation } = storage.getWorld()
        const clients = storage.getClients()
        const newCells = getNextGeneration(cells)
        storage.updateWorld(newCells, generation + 1)
        sendWorldUpdate(clients, { cells: newCells, generation: generation + 1 })
    }

    const pauseTick = () => {
        clearInterval(ticksInterval)
        ticksInterval = 0
    }

    const refreshTicks = () => {
        pauseTick()
        const clients = storage.getClients()
        const newCells = createGrid(20)
        storage.updateWorld(newCells, 0)
        sendWorldUpdate(clients, { cells: newCells, generation: 0 })
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

module.exports = createController
