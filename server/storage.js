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

    return {
        updateWorld,
        addClient,
        getClients,
        getWorld,
    }
}

module.exports = createStorage
