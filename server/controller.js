const {
    getNextGeneration,
    putCellOnCoordinates,
    putPatternOnCoordinates,
    createGrid,
} = require('./board')
const { topics } = require('./constants')

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
                    world,
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

    const placeCell = msg => {
        const { x, y, color } = msg.data
        const world = storage.getWorld()
        const clients = storage.getClients()
        const newWorld = putCellOnCoordinates(world, x, y, color)
        storage.updateWorld(newWorld)
        sendWorldUpdate(clients, newWorld)
    }

    const placePattern = msg => {
        const { x, y, color, pattern } = msg.data
        const world = storage.getWorld()
        const clients = storage.getClients()
        const newWorld = putPatternOnCoordinates(world, x, y, color, pattern)
        storage.updateWorld(newWorld)
        sendWorldUpdate(clients, newWorld)
    }

    const startTicks = () => {
        ticksInterval = setInterval(nextTick, 1000)
    }

    const nextTick = () => {
        const world = storage.getWorld()
        const clients = storage.getClients()
        const newWorld = getNextGeneration(world)
        storage.updateWorld(newWorld)
        sendWorldUpdate(clients, newWorld)
    }

    const pauseTick = () => {
        clearInterval(ticksInterval)
    }

    const refreshTicks = () => {
        const clients = storage.getClients()
        const newWorld = createGrid(20)
        storage.updateWorld(newWorld)
        sendWorldUpdate(clients, newWorld)
    }

    return {
        handleInitialRequest,
        sendWorldUpdate,
        placeCell,
        startTicks,
        nextTick,
        pauseTick,
        refreshTicks,
        placePattern,
    }
}

module.exports = createController
