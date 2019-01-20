import React from 'react'
import { v4 } from 'uuid'
import styled from 'styled-components'

import { TdBase as Td, Flexed } from './common'

const Wrapper = styled(Flexed)`
    margin: 10px -10px;
`

const ItemWrapper = styled.div`
    cursor: pointer;
    margin: 0 10px;
    padding: 5px;
    background-color: ${({ isSelected, theme }) => isSelected && theme.selectedColor};

    &:hover {
        background-color: ${({ theme, isSelected }) => !isSelected && theme.hoverColor};
    }
`

const Name = styled.p`
    margin: 0;
`

const Item = ({ name, cells, isSelected, handleItemClick }) => (
    <ItemWrapper isSelected={isSelected} onClick={() => handleItemClick(name)}>
        <Name>{name}</Name>
        <table>
            <tbody>
                {cells.map(row => (
                    <tr key={v4()}>
                        {row.map(cell => (
                            <Td key={v4()} color={cell} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </ItemWrapper>
)

const Patterns = ({ patterns, handleItemClick, selectedPattern }) => (
    <Wrapper>
        {patterns.map(pattern => (
            <Item
                key={v4()}
                {...pattern}
                handleItemClick={handleItemClick}
                isSelected={selectedPattern === pattern.name}
            />
        ))}
    </Wrapper>
)

export default Patterns
