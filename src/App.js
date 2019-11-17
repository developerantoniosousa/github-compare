import React, { Fragment } from 'react';
import styled from 'styled-components';

import GlobalStyle from './styles/global';

import Main from './pages/Main';

const Title = styled.h1`
  color: #f00;
  font-size: 32px;
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Main />
    </Fragment>
  );
}

export default App;
