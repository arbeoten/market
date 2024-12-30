import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
display: flex;
justify-content: center;
border-bottom : 1px solid silver;
`

export const Container = styledComponents.div`
display: flex;
align-items: center;
justify-content: center;
width: 960px;
margin: 20px 0;
&>*{
    margin-left : 20px;
}
`
export const SearchBox = styledComponents.div`
    display: flex;
    width : 460px;

    & > * {
        height : 40px;
    }

    & > input {
        box-sizing : border-box;
        border: 2px solid orange;
        border-right : 0;
        width: 410px;
        outline: none;
        padding-left: 8px;
    }

    & > button {
        color: orange;
        background-color: white;
        width: 40px;
        border: 2px solid orange;
        border-left : 0;
            &:hover {
                cursor: pointer;
            }
    }
`

export const LoginBt = styledComponents.button`
    width: 100px;
    height:40px;
    background-color: white;
    border: none;
    color: silver;
    &:hover {
        cursor: pointer;
    }
`
