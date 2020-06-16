import React, {
  useState,
  forwardRef,
  RefObject,
  useCallback,
  ChangeEvent
} from 'react';

import debounce from 'lodash/debounce';
import { usePercentValue } from '../hooks/usePercentValue';
import useUpdateEffect from '../hooks/useUpdateEffect';

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type RequiredInputProps = Required<Pick<InputHTMLAttributes, 'value'>>;
export type OptionalInputProps = Pick<
  InputHTMLAttributes,
  'type' | 'placeholder' | 'readOnly' | 'onBlur' | 'onFocus'
>;
type IOnStringChange = (value: string) => void;
type IOnNumberChange = (value: number) => void;
type OptionalRefProps = {
  forwardedRef?: RefObject<HTMLInputElement>;
};
type BaseInputProps = RequiredInputProps &
  OptionalInputProps &
  OptionalRefProps;

function BaseInput({
  value,
  onChange,
  pattern,
  forwardedRef,
  ...rest
}: BaseInputProps & { onChange: IOnStringChange; pattern: RegExp }) {
  const [state, setState] = useState(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    [debouncedChange, pattern]
  );

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <input
      {...rest}
      ref={forwardedRef}
      type="text"
      value={state}
      onChange={callback}
    />
  );
}

type NumberInputProps = BaseInputProps & { onChange: IOnNumberChange };
type PercentInputProps = NumberInputProps;

const patterns = {
  number: /\d+/,
  text: /[\d\w]*/
};

export function NumberInput({ value, onChange, ...rest }: NumberInputProps) {
  const callback = useCallback(
    (value: string) => {
      onChange(+value);
    },
    [onChange]
  );
  return (
    <BaseInput
      {...rest}
      value={value}
      onChange={callback}
      pattern={patterns.number}
    />
  );
}

export function PercentInput({ value, onChange, ...rest }: PercentInputProps) {
  const [rawValue, percentValue, setPercentValue] = usePercentValue(
    value as number
  );
  const callback = useCallback(
    (v: string) => {
      setPercentValue(+v);
    },
    [setPercentValue]
  );

  useUpdateEffect(() => {
    onChange(rawValue);
  }, [rawValue]);

  return (
    <BaseInput
      {...rest}
      value={percentValue}
      onChange={callback}
      pattern={patterns.number}
    />
  );
}

export type TextInputProps = BaseInputProps & {
  onChange: IOnStringChange;
};

export function TextInput(props: TextInputProps) {
  return <BaseInput {...props} pattern={patterns.text} />;
}

export const ForwardedTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <TextInput {...props} forwardedRef={ref as RefObject<HTMLInputElement>} />
    );
  }
);
