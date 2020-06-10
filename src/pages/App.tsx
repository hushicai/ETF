import * as React from 'react';
import { Settings } from './Settings';
import { Grids } from './Grids';
import { AppContext, reducer, initialState } from '../common/store';
import Github from '../images/github.png';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5em;
  box-sizing: border-box;
  max-width: 960px;
  margin: 0 auto;
`;

const H1 = styled.h1`
  margin-bottom: 0.5em;
  font-size: 2em;
  display: flex;
  align-items: center;

  a {
    margin-left: 10px;
  }

  img {
    display: block;
    width: 16px;
    height: 16px;
  }
`;

const Footer = styled.footer`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Container>
      <header>
        <H1>
          网格交易策略
          <a href="https://github.com/hushicai/etf" title="查看源码">
            <img src={Github} />
          </a>
        </H1>
      </header>
      <main className="app-main">
        <AppContext.Provider value={{ state, dispatch }}>
          <Settings />
          <Grids />
        </AppContext.Provider>
      </main>
      <Footer>@copyright {new Date().getFullYear()}</Footer>
    </Container>
  );
}

export default App;
