import React, { useState } from 'react';
import { useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import { usePercentValue } from '../hooks/usePercentValue';
import useUpdateEffect from '../hooks/useUpdateEffect';

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type IOnChange = (value: number) => void;
type RequiredTextInputProps = Required<Pick<InputHTMLAttributes, 'value'>> & {
  onChange: IOnChange;
};
type OptionalTextInputProps = Pick<InputHTMLAttributes, 'type'>;

export function TextInput({
  value,
  onChange,
  ...rest
}: RequiredTextInputProps & OptionalTextInputProps) {
  const [state, setState] = useState(value);
  const debouncedChange = useCallback(debounce<IOnChange>(onChange, 300), []);
  const callback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setState(v);
    debouncedChange(+v);
  }, []);

  return <input {...rest} type="number" value={state} onChange={callback} />;
}

export function PercentTextInput({
  value,
  onChange,
  ...rest
}: RequiredTextInputProps & OptionalTextInputProps) {
  const [rawValue, percentValue, setPercentValue] = usePercentValue(
    value as number,
  );
  const callback = useCallback((v: number) => {
    setPercentValue(v);
  }, []);

  useUpdateEffect(() => {
    onChange(rawValue);
  }, [rawValue]);

  return (
    <>
      <TextInput {...rest} value={percentValue} onChange={callback} />%
    </>
  );
}
