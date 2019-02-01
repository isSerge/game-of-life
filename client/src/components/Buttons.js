import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    margin: 5px 10px;
    padding: 10px 20px;
    border-radius: 15px;
    text-transform: uppercase;
    outline: none;

    &:hover {
        background-color: ${({ theme }) => theme.selectedColor};
    }
`

const Wrapper = styled.div`
    margin: 20px 0;
`

const Buttons = ({ startTicks, nextTick, pauseTicks, refreshTicks }) => (
    <Wrapper>
        <Button onClick={startTicks}>start</Button>
        <Button onClick={nextTick}>next</Button>
        <Button onClick={pauseTicks}>pause</Button>
        <Button onClick={refreshTicks}>refresh</Button>
    </Wrapper>
)

export default Buttons
