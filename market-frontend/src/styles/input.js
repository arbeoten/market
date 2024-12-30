import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
    display: flex;
    justify-content: center;
`

export const Container = styledComponents.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 960px;
margin: 20px 0;
&>*{
    display: flex;
    flex-direction: column;
    &>*{
        margin: 10px auto;
    }
}
`
