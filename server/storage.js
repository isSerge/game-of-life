const createStorage = world => {
    const store = {
        world,
        generation: 0,
        clients: [],
    }

    const updateWorld = world => (store.world = world)
    const getWorld = () => store.world
    const incrementGeneration = () => (store.generation += 1)
    const addClient = client => store.clients.push(client)
    const getClients = () => store.clients

    return {
        updateWorld,
        addClient,
        incrementGeneration,
        getClients,
        getWorld,
    }
}

module.exports = createStorage
