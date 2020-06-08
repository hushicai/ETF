import { useState } from '/web_modules/react.js';

const numberToPercent = v => String((v * 100).toFixed(0));

const percentToNumber = v => parseFloat((v / 100).toFixed(2));

export function usePercentValue(initialValue) {
  const [state, setState] = useState(initialValue);
  return [numberToPercent(state), value => {
    setState(percentToNumber(value));
  }];
}