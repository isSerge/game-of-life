import React from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'

import { TdBase } from './common'

const Td = styled(TdBase)`
    background-color: ${({ color }) => (color ? color : '#fff')};

    &:hover {
        background-color: ${({ color }) => (color ? color : '#e6f7ff')};
    }
`

const Board = ({ cells, handleCellClick }) => (
    <table>
        <tbody>
            {cells.map((row, xIndex) => (
                <tr key={v4()}>
                    {row.map((cell, yIndex) => (
                        <Td
                            key={v4()}
                            color={cell}
                            onClick={() => handleCellClick(xIndex, yIndex)}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)

export default Board
