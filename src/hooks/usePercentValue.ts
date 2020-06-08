import { useState } from 'react';

const numberToPercent = (v: number): string => String((v * 100).toFixed(0));
const percentToNumber = (v: number) => parseFloat((v / 100).toFixed(2));

export function usePercentValue(
  initialValue: number,
): [number, string, (value: number) => void] {
  const [state, setState] = useState(initialValue);

  return [
    state,
    numberToPercent(state),
    (value: number) => {
      setState(percentToNumber(+value));
    },
  ];
}
