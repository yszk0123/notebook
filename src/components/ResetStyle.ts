import { createGlobalStyle } from '../application/styled-components';

export const ResetStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  /* Apply border-box to all elements */
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;
