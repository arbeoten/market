import styledComponents from 'styled-components'

export const Wrap = styledComponents.div`
display: flex;
justify-content: center;
margin: 0 auto;
width: 960px;
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
        border: 2px solid rgb(138, 175, 231);;
        border-right : 0;
        width: 410px;
        outline: none;
        padding-left: 8px;
    }

    & > button {
        color: rgb(138, 175, 231);
        background-color: white;
        width: 40px;
        border: 2px solid rgb(138, 175, 231);;
        border-left : 0;
            &:hover {
                cursor: pointer;
            }
    }
`

export const LoginBt = styledComponents.button`
    width: 140px;
    background-color: white;
    border: none;
    color: silver;
    &:hover {
        cursor: pointer;
    }
`
