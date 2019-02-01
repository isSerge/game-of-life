import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`

const Lang = styled.span`
    cursor: pointer;
    padding: 0 10px;
    color: ${({ isActive, theme }) => isActive && theme.selectedColor};

    &:hover {
        color: ${({ theme }) => theme.selectedColor};
    }
`

const Title = styled.h1`
    margin: 0;
    text-transform: uppercase;
`

const Header = ({ title }) => (
    <Wrapper>
        <Title>{title}</Title>
        <div>
            <Lang isActive>ENG</Lang>
            <Lang>中文</Lang>
        </div>
    </Wrapper>
)

export default Header
