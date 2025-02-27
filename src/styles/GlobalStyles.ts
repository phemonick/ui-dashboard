import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    font-family: ${(props) => props.theme.primaryFont};
    font-size: 62.5%;
    color: ${(props) => props.theme.colours.greyDarker}
  }

  html, body {
    margin: 0;
    overflow: hidden;
  }

  body, #root {
    font-size: ${(props) => props.theme.baseFontSize};
    line-height: ${(props) => props.theme.baseLineHeight};
    height: 100%;
    transform-style:preserve-3d;
  }

  * {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
  }

  svg {
    overflow: inherit;
  }

  form {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colours.primary};

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
  }

`;

export const TooltipContent = styled.div`
  max-width: 20rem;
  text-align: center;
  margin: 0 -1rem;
`;