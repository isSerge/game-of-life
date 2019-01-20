import React from 'react'
import styled from 'styled-components'

import { dot, Flexed } from './common'

const ColorDot = styled.div`
    ${dot}
    margin-left: 10px;
    background-color: ${({ color }) => color || '#000'};
`

const Wrapper = styled(Flexed)`
    justify-content: space-between;
    width: 500px;
`

const Info = ({ color, generation }) => (
    <Wrapper>
        <Flexed>
            <p>Your color </p>
            <ColorDot color={color} />
        </Flexed>
        <p>Generation: {generation}</p>
    </Wrapper>
)

export default Info
