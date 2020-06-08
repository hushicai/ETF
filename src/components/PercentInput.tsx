import React from 'react';
import { useCallback, ChangeEvent } from 'react';
import { usePercentValue } from '../hooks/usePercentValue';

type Props = {
  value: number;
  // onChange: (value: string) => void;
};

export function PercentInput({
  value,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  const [percentValue, setPercentValue] = usePercentValue(value as number);
  const callback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value;
    setPercentValue(v);
  }, []);

  return (
    <>
      <input
        type="number"
        step="1"
        defaultValue={percentValue}
        value={percentValue}
        onChange={callback}
        {...rest}
      />
      %
    </>
  );
}
