// const fs = require('fs');
const http = require('http')
const Websocket = require('websocket').server

const { topics, BOARD_SIZE } = require('./constants')
const createStorage = require('./storage')
const createService = require('./service')
const { createGrid } = require('./board')
const { getNewUserColor } = require('./utils')

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

const storage = createStorage(createGrid(BOARD_SIZE))

const createMessageHandler = service => message => {
    const topicHandlers = {
        [topics.INITIAL_REQUEST]: service.handleInitialRequest,
        [topics.PLACE_CELLS]: service.placeCells,
        [topics.START_TICKS]: service.startTicks,
        [topics.NEXT_TICK]: service.nextTick,
        [topics.PAUSE_TICK]: service.pauseTick,
        [topics.REFRESH_TICKS]: service.refreshTicks,
    }

    const propName = `${message.type}Data`

    try {
        const msg = JSON.parse(message[propName])
        const handle = topicHandlers[msg.topic]
        return handle(msg)
    } catch (error) {
        console.error(error)
    }
}

const createCloseHandler = connection => (reasonCode, description) => {
    console.log(`Disconnected ${connection.remoteAddress}`)
    console.dir({ reasonCode, description })
}

const createRequestHandler = storage => req => {
    // accept all requests
    const connection = req.accept('', req.origin)
    const currentColors = storage.getColors()
    const newUserColor = getNewUserColor(currentColors)

    storage.addClient({ connection, color: newUserColor })

    console.log(`Connected ${connection.remoteAddress}`)

    const service = createService(storage, connection)
    const handleMessage = createMessageHandler(service)
    const handleClose = createCloseHandler(connection)

    connection.on('message', handleMessage)
    connection.on('close', handleClose)
}

ws.on('request', createRequestHandler(storage))
