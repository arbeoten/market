import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
    display: flex;
    justify-content: center;
    `

export const Container = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 960px;
    `

export const SwiperBox = styledComponents.div`
    margin: 10px;
    width: 400px;
    `

export const ContentBox = styledComponents.div`
    width: 400px;
    margin: 10px;
    &>p {
    margin: 10px 0;
    }
`

export const DetailBt = styledComponents.button`
    width: 90px;
    height: 40px;
    background-color: rgb(138, 175, 231);
    font-size: 0.9em;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 8px;
    cursor: pointer;
`
