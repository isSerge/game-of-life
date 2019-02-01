import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`

const Title = styled.h1`
    margin: 0;
    text-transform: uppercase;
`

const Header = ({ title }) => (
    <Wrapper>
        <Title>{title}</Title>
    </Wrapper>
)

export default Header
