import React, { useState } from 'react';
import { useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import { usePercentValue } from '../hooks/usePercentValue';
import useUpdateEffect from '../hooks/useUpdateEffect';

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type RequiredInputProps = Required<Pick<InputHTMLAttributes, 'value'>>;
type OptionalInputProps = Pick<InputHTMLAttributes, 'type'>;

type IOnStringChange = (value: string) => void;
type TextInputProps = RequiredInputProps &
  OptionalInputProps & { onChange: IOnStringChange } & { pattern: RegExp };

export function TextInput({
  value,
  onChange,
  pattern,
  ...rest
}: TextInputProps) {
  const [state, setState] = useState(value);
  const debouncedChange = useCallback(
    debounce<IOnStringChange>(onChange, 300),
    []
  );
  const callback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setState(v);
      if (pattern && pattern.test(v)) {
        debouncedChange(v);
      }
    },
    [pattern]
  );

  return <input type="text" value={state} onChange={callback} />;
}

type IOnNumberChange = (value: number) => void;
type NumberInputProps = RequiredInputProps &
  OptionalInputProps & { onChange: IOnNumberChange };

const patterns = {
  number: /\d+/
};

export function NumberInput({ value, onChange, ...rest }: NumberInputProps) {
  const callback = useCallback((value: string) => {
    onChange(+value);
  }, []);
  return (
    <TextInput value={value} onChange={callback} pattern={patterns.number} />
  );
}

export function PercentInput({ value, onChange, ...rest }: NumberInputProps) {
  const [rawValue, percentValue, setPercentValue] = usePercentValue(
    value as number
  );
  const callback = useCallback((v: string) => {
    setPercentValue(+v);
  }, []);

  useUpdateEffect(() => {
    onChange(rawValue);
  }, [rawValue]);

  return (
    <TextInput
      {...rest}
      value={percentValue}
      onChange={callback}
      pattern={patterns.number}
    />
  );
}
