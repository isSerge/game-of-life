import React from 'react'

const Buttons = ({ startTicks, nextTick, pauseTicks, refreshTicks }) => (
    <div>
        <button onClick={startTicks}>start</button>
        <button onClick={nextTick}>next</button>
        <button onClick={pauseTicks}>pause</button>
        <button onClick={refreshTicks}>refresh</button>
    </div>
)

export default Buttons
