import styledComponents from 'styled-components'

export const Container = styledComponents.div`
display: flex;
flex-direction: column;
align-items: center;
`

export const Table = styledComponents.table`
width: 720px;
    & * {
        padding : 5px;
    }
`
