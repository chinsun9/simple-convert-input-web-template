import styled from '@emotion/styled';
import React from 'react';
import Header from 'components/Header';
import Main from 'components/Main';

const Style = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const App = () => (
  <Style>
    <Header />
    <Main />
  </Style>
);

export default App;
