import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
    display: flex;
    justify-content: center;
    `

export const Container = styledComponents.div`
    display: flex;
    justify-content: center;
    width: 960px;
    `

export const SwiperBox = styledComponents.div`
    width: 400px;
    margin: 10px;
    `

export const ContentBox = styledComponents.div`
    width: 400px;
    margin: 10px;
    &>p {
    margin: 10px 0;
    }
`
