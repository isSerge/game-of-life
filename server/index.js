// const fs = require('fs');
const http = require('http')
const Websocket = require('websocket').server
const { getNextGeneration, createGrid, putCellOnCoordinates } = require('./board')
const topics = require('./topics')

// const index = fs.readFileSync('./index.html', 'utf8');
// (req, res) => {
//     res.writeHead(200);
//     res.end(index);
//   }
const server = http.createServer()

server.listen(8000, () => {
    console.log('Listen port 8000')
})

const ws = new Websocket({
    httpServer: server,
    autoAcceptConnections: false,
})

let clients = []
let world = createGrid(20)

const generateRandomColor = () => `#${(((1 << 24) * Math.random()) | 0).toString(16)}`

const handleInitialRequest = connection => {
    const { color } = clients.find(cl => cl.connection === connection)

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

const placeCell = ({ x, y, color }) => {
    world = putCellOnCoordinates(world, x, y, color)
    sendWorldUpdate(clients, world)
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

ws.on('request', req => {
    const connection = req.accept('', req.origin)

    clients.push({ connection, color: generateRandomColor() })

    console.log('Connected ' + connection.remoteAddress)

    connection.on('message', message => {
        console.log('message :', message)
        const propName = `${message.type}Data`

        try {
            const msg = JSON.parse(message[propName])

            switch (msg.topic) {
                case topics.INITIAL_REQUEST:
                    return handleInitialRequest(connection)
                case topics.PLACE_CELL:
                    return placeCell(msg.data)
                case topics.START_TICKS:
                    return startTicks()
                case topics.NEXT_TICK:
                    return nextTick()
                case topics.PAUSE_TICK:
                    return pauseTick()
                case topics.REFRESH_TICKS:
                    return refreshTicks()
                default:
                    break
            }
        } catch (error) {
            console.error(error)
        }
    })

    connection.on('close', (reasonCode, description) => {
        console.log('Disconnected ' + connection.remoteAddress)
        console.dir({ reasonCode, description })
    })
})
