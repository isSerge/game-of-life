const patternNames = {
    TUB: 'Tub',
    BOAT: 'Boat',
    BLINKER: 'Blinker',
    GLIDER: 'Glider',
    DEFAULT: 'Default',
}

const topics = {
    INITIAL_REQUEST: 'initial-request',
    INITIAL_RESPONSE: 'initial-response',
    PLACE_CELLS: 'place-cells',
    START_TICKS: 'start-ticks',
    NEXT_TICK: 'next-tick',
    PAUSE_TICK: 'pause-tick',
    REFRESH_TICKS: 'refresh-ticks',
    WORLD_UPDATE: 'world-update',
}

const BOARD_SIZE = process.env.BOARD_SIZE || 20

const TICK_INTERVAL = process.env.TICK_INTERVAL || 1000

module.exports = {
    patternNames,
    topics,
    BOARD_SIZE,
    TICK_INTERVAL,
}
