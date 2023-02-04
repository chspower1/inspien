import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "../css/font.css";
export const GlobalStyled = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    *{
        font-family: "Sebang";      
        font-size: 16px;
    }
    html{
        font-size: 16px;
        -webkit-text-size-adjust: none;
        font-family: "Sebang";       
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    a{
        text-decoration: none;
        text-underline-offset:unset ;
    }

`;
