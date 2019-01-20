import React from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'

const Td = styled.td`
    border: 1px solid #e8e8e8;
    width: 15px;
    height: 15px;
    transition: all 300ms;
    background-color: ${({ color }) => (color ? color : '#fff')};
    border-radius: 50%;

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
