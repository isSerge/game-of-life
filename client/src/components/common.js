import styled, { css } from 'styled-components'

export const dot = css`
    width: ${({ theme }) => theme.dotSize};
    height: ${({ theme }) => theme.dotSize};
    border-radius: 50%;
`

export const TdBase = styled.td`
    ${dot}
    border: 1px solid #e8e8e8;
    transition: all 300ms;
    background-color: ${({ color }) => (color ? '#000' : '#fff')};
`

export const Flexed = styled.div`
    display: flex;
    align-items: center;
`
