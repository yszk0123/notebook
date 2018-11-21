import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalNavigation } from './GlobalNavigation';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from './styled-components';
import { theme } from './theme';

export function render() {
  const mountPoint = document.getElementById('root');
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <>
        <GlobalNavigation />
        <GlobalStyle />
      </>
    </ThemeProvider>,
    mountPoint
  );
}
