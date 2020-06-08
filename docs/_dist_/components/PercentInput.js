function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from '/web_modules/react.js';
import { useCallback } from '/web_modules/react.js';
import { usePercentValue } from '../hooks/usePercentValue.js';
export function PercentInput({
  value,
  ...rest
}) {
  const [percentValue, setPercentValue] = usePercentValue(value);
  const callback = useCallback(e => {
    const v = +e.target.value;
    setPercentValue(v);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", _extends({
    type: "number",
    step: "1",
    defaultValue: percentValue,
    value: percentValue,
    onChange: callback
  }, rest)), "%");
}