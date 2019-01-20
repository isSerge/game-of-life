const { getNextGeneration, putCellOnCoordinates } = require('./board')

const createController = (storage, connection) => {
    const handleInitialRequest = () => {
        const clients = storage.getClients()
        const { color } = clients.find(cl => cl.connection === connection)
        const world = storage.getWorld()

        connection.send(
            JSON.stringify({
                topic: 'initial-response',
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
                    topic: 'world-update',
                    data: world,
                }),
            )
        })
    }

    const placeCell = msg => {
        const { x, y, color } = msg.data
        const world = storage.getWorld()
        const newWorld = putCellOnCoordinates(world, x, y, color)
        storage.updateWorld(newWorld)
        const clients = storage.getClients()
        sendWorldUpdate(clients, newWorld)
    }

    const startTicks = () => {
        console.log('ticks started')
    }

    const nextTick = () => {
        console.log('todo nextTick')
    }

    const pauseTick = () => {
        console.log('todo pauseTick')
    }

    const refreshTicks = () => {
        console.log('todo refreshTicks')
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
