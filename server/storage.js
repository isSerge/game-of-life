const createStorage = cells => {
    const store = {
        cells,
        generation: 0,
        clients: [],
    }

    const updateWorld = (cells, generation) => {
        store.cells = cells

        if (generation || generation === 0) {
            store.generation = generation
        }
    }

    const getWorld = () => {
        const { cells, generation } = store
        return { cells, generation }
    }

    const addClient = client => store.clients.push(client)
    const getClients = () => store.clients
    const getCurrentClient = connection => store.clients.find(cl => cl.connection === connection)
    const getColors = () => store.clients.map(client => client.color)

    return {
        updateWorld,
        addClient,
        getClients,
        getWorld,
        getColors,
        getCurrentClient,
    }
}

module.exports = createStorage
