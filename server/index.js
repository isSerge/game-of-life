// const fs = require('fs');
const http = require('http')
const Websocket = require('websocket').server

const topics = require('./topics')
const createStorage = require('./storage')
const createController = require('./controller')
const { createGrid } = require('./board')
const { generateRandomColor } = require('./utils')

const storage = createStorage(createGrid(20))
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

const createMessageHandler = controller => message => {
    console.log('message :', message)
    const propName = `${message.type}Data`

    const topicHandlers = {
        [topics.INITIAL_REQUEST]: controller.handleInitialRequest,
        [topics.PLACE_CELL]: controller.placeCell,
        [topics.START_TICKS]: controller.startTicks,
        [topics.NEXT_TICK]: controller.nextTick,
        [topics.PAUSE_TICK]: controller.pauseTick,
        [topics.REFRESH_TICKS]: controller.refreshTicks,
    }

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

const handleRequest = req => {
    const connection = req.accept('', req.origin)
    const color = generateRandomColor()

    storage.addClient({ connection, color })

    console.log(`Connected ${connection.remoteAddress}`)

    const controller = createController(storage, connection)
    const handleClose = createCloseHandler(connection)
    const handleMessage = createMessageHandler(controller)

    connection.on('message', handleMessage)
    connection.on('close', handleClose)
}

ws.on('request', handleRequest)
