import * as React from '/web_modules/react.js';
import { Settings } from './Settings.js';
import { Grids } from './Grids.js';
import { AppContext, reducer, initialState } from '../common/store.js';

function App({}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "app-header"
  }, /*#__PURE__*/React.createElement("h1", null, "\u7F51\u683C\u4EA4\u6613\u7CFB\u7EDF")), /*#__PURE__*/React.createElement("main", {
    className: "app-main"
  }, /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, /*#__PURE__*/React.createElement(Settings, null), /*#__PURE__*/React.createElement(Grids, null))), /*#__PURE__*/React.createElement("footer", {
    className: "app-footer"
  }, "@copyright 2020"));
}

export default App;