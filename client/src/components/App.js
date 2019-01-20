import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'

import Header from './Header'
import Board from './Board'
import Patterns from './Patterns'
import topics from '../topics'
import patterns from '../patterns'
import { dot, Flexed } from './common'

const ColorDot = styled.div`
    ${dot}
    margin-left: 10px;
    background-color: ${({ color }) => color};
`

const putCellOnCoordinates = (cells, x, y) =>
    cells.map((row, xIndex) =>
        row.map((cell, yIndex) => {
            if (x === xIndex && y === yIndex) {
                return 1
            }
            return cell
        }),
    )

const App = () => {
    const socket = new WebSocket('ws://127.0.0.1:8000/')

    const [cells, updateCells] = useState([])
    const [generation, setGeneration] = useState(0)
    const [userColor, setUserColor] = useState('')
    const [selectedPattern, selectPattern] = useState('Default')

    const sendEvent = (topic, data) =>
        socket.send(
            JSON.stringify({
                topic,
                data,
            }),
        )

    const placeCell = (x, y) => {
        // check if pattern is not default
        // get neighbours
        // update neigbours according to pattern
        // send - events or event?
        if (!cells[x][y]) {
            sendEvent(topics.PLACE_CELL, { x, y, color: userColor })
        }
    }

    const startTicks = () => sendEvent(topics.START_TICKS)
    const nextTick = () => sendEvent(topics.NEXT_TICK)
    const pauseTicks = () => sendEvent(topics.PAUSE_TICK)
    const refreshTicks = () => sendEvent(topics.REFRESH_TICKS)

    const handleEvent = event => {
        // console.log('event :', event)
        const object = JSON.parse(event.data)

        if (object.topic === topics.PLACE_CELL) {
            const { x, y } = object.data
            updateCells(putCellOnCoordinates(cells, x, y))
        }

        if (object.topic === topics.INITIAL_RESPONSE) {
            setUserColor(object.data.color)
            updateCells(object.data.world)
        }

        if (object.topic === topics.WORLD_UPDATE) {
            updateCells(object.data)
        }
    }

    useLayoutEffect(() => {
        socket.addEventListener('open', () => sendEvent(topics.INITIAL_REQUEST))
        socket.addEventListener('message', handleEvent)

        return () => {
            socket.removeEventListener('open', () => sendEvent(topics.INITIAL_REQUEST))
            socket.removeEventListener('message', handleEvent)
            socket.close()
        }
    }, [])

    return (
        <div>
            <Header title="Game of life" />
            <Flexed>
                <p>Your color </p>
                <ColorDot color={userColor} />
            </Flexed>
            <p>Generation: {generation}</p>
            <Board cells={cells} handleCellClick={placeCell} />
            <Patterns
                patterns={patterns}
                handleItemClick={selectPattern}
                selectedPattern={selectedPattern}
            />
            <button onClick={startTicks}>start</button>
            <button onClick={nextTick}>next</button>
            <button onClick={pauseTicks}>pause</button>
            <button onClick={refreshTicks}>refresh</button>
        </div>
    )
}

export default App
