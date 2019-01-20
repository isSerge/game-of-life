import React from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'

import { TdBase } from './common'

const Td = styled(TdBase)`
    background-color: ${({ theme, color }) => (color ? color : theme.cellDefaultColor)};

    &:hover {
        background-color: ${({ theme, color }) => (color ? color : theme.hoverColor)};
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
