import React, { useState, useLayoutEffect } from 'react'

import Header from './Header'
import Board from './Board'
import Patterns from './Patterns'
import Buttons from './Buttons'
import Info from './Info'

import { topics, patternNames } from '../constants'
import patterns from '../patterns'

const socket = new WebSocket('ws://127.0.0.1:8000/')

const sendEvent = (topic, data) =>
    socket.send(
        JSON.stringify({
            topic,
            data,
        }),
    )

const App = () => {
    const [cells, updateCells] = useState([])
    const [generation, setGeneration] = useState(0)
    const [color, setColor] = useState('')
    const [selectedPattern, selectPattern] = useState(patternNames.DEFAULT)

    const placeCell = (x, y) => {
        if (selectedPattern !== patternNames.DEFAULT) {
            return sendEvent(topics.PLACE_PATTERN, { x, y, color, pattern: selectedPattern })
        }

        // check if already has a cell
        if (!cells[x][y]) {
            return sendEvent(topics.PLACE_CELL, { x, y, color })
        }
    }

    const startTicks = () => sendEvent(topics.START_TICKS)
    const nextTick = () => sendEvent(topics.NEXT_TICK)
    const pauseTicks = () => sendEvent(topics.PAUSE_TICK)
    const refreshTicks = () => sendEvent(topics.REFRESH_TICKS)
    const initialRequest = () => sendEvent(topics.INITIAL_REQUEST)

    const handleEvent = event => {
        const object = JSON.parse(event.data)

        if (object.topic === topics.INITIAL_RESPONSE) {
            const { color, cells } = object.data
            setColor(color)
            updateCells(cells)
        }

        if (object.topic === topics.WORLD_UPDATE) {
            const { generation, cells } = object.data
            updateCells(cells)
            setGeneration(generation)
        }
    }

    useLayoutEffect(() => {
        socket.addEventListener('open', initialRequest)
        socket.addEventListener('message', handleEvent)

        return () => {
            socket.removeEventListener('open', initialRequest)
            socket.removeEventListener('message', handleEvent)
            socket.close()
        }
    }, [])

    return (
        <div>
            <Header title="Game of life" />
            <Info generation={generation} color={color} />
            <Buttons
                startTicks={startTicks}
                nextTick={nextTick}
                pauseTicks={pauseTicks}
                refreshTicks={refreshTicks}
            />
            <Board cells={cells} handleCellClick={placeCell} />
            <Patterns
                patterns={patterns}
                handleItemClick={selectPattern}
                selectedPattern={selectedPattern}
            />
        </div>
    )
}

export default App
