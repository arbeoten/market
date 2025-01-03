import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
    width: 960px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `

export const Container = styledComponents.div`
    display: flex;
    flex-direction : column;
    width: 960px;
    & > * {
        padding: 10px 0 0 20px;
    }
    `

export const CardContainer = styledComponents.div`
    display: flex;
    flex-wrap: wrap;    
`

export const OrderBt = styledComponents.button`
    width: 80px;
    height: 40px;
    line-height: 40px;
    background-color: white;
    color: rgb(80, 137, 223);
    font-size: 0.9em;   
    border: none;
    border-radius: 5px;
    cursor: pointer;
`
