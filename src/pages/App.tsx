import * as React from 'react';
import { Settings } from './Settings';
import { Grids } from './Grids';
import { AppContext, reducer, initialState } from '../common/store';

interface AppProps {}

function App({}: AppProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className="app">
      <header className="app-header">
        <h1>网格交易系统</h1>
      </header>
      <main className="app-main">
        <AppContext.Provider value={{ state, dispatch }}>
          <Settings />
          <Grids />
        </AppContext.Provider>
      </main>
      <footer className="app-footer">@copyright 2020</footer>
    </div>
  );
}

export default App;
