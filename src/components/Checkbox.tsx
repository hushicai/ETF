import React, { useState, useCallback, ChangeEvent } from 'react';

import useUpdateEffect from '../hooks/useUpdateEffect';

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type IOnChange = (value: boolean) => void;
type RequiredTextInputProps = Required<Pick<InputHTMLAttributes, 'checked'>> & {
  onChange: IOnChange;
};

export function CheckBox({
  checked,
  onChange,
  ...rest
}: RequiredTextInputProps) {
  const [state, setState] = useState<boolean>(checked);
  const callback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    setState(v);
  }, []);

  useUpdateEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <input {...rest} type="checkbox" checked={state} onChange={callback} />
  );
}
