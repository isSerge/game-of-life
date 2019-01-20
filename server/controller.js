const { getNextGeneration, putCellOnCoordinates, createGrid } = require('./board')
const topics = require('./topics')

const createController = (storage, connection) => {
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

    const startTicks = () => {
        console.log('ticks started')
    }

    const nextTick = () => {
        const world = storage.getWorld()
        const clients = storage.getClients()
        const newWorld = getNextGeneration(world)
        storage.updateWorld(newWorld)
        sendWorldUpdate(clients, newWorld)
    }

    const pauseTick = () => {
        console.log('todo pauseTick')
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
    }
}

module.exports = createController
