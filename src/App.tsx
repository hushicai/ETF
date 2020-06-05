import * as React from 'react';
import { Settings } from './Settings';
import { Grids } from './Grids';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="app">
      <header className="app-header">
        <h1>网格交易系统</h1>
      </header>
      <main className="app-main">
        <Settings />
        <Grids />
      </main>
      <footer className="app-footer">@copyright 2020</footer>
    </div>
  );
}

export default App;
