import React, { useContext } from '/web_modules/react.js';
import styled from '/web_modules/styled-components.js';
import { AppContext } from '../common/store.js';
import { PercentInput } from '../components/PercentInput.js';
const Row = styled.div`
  display: flex;
`;
export function Settings() {
  const {
    state
  } = useContext(AppContext);
  const {
    amount,
    percentPerGrid,
    increasePercentPerGrid
  } = state;
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u57FA\u672C\u8BBE\u7F6E"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u6BCF\u4EFD\u91D1\u989D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: amount
  }), "\u5143"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u6BCF\u683C\u5E45\u5EA6"), /*#__PURE__*/React.createElement(PercentInput, {
    value: percentPerGrid,
    min: 1,
    max: 10
  })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u7F51\u683C\u6570"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "10"
  }))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u7559\u5229\u6DA6"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u7559\u5B58\u4EFD\u6570"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "0"
  }))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u9010\u683C\u52A0\u7801"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u52A0\u7801\u5E45\u5EA6"), /*#__PURE__*/React.createElement(PercentInput, {
    value: increasePercentPerGrid,
    min: 0
  }))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u4E00\u7F51\u6253\u5C3D"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u4E2D\u7F51", /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement("label", null, "\u5927\u7F51", /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })))));
}