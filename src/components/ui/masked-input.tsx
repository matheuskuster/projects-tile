'use client';

import InputMask, { type Props } from 'react-input-mask';

import { Input, InputProps } from './input';

interface MaskedInputProps extends Props, InputProps {}

export function MaskedInput(props: MaskedInputProps) {
  return (
    <InputMask maskChar={props.maskChar ?? '_'} {...props}>
      {/* @ts-expect-error */}
      {(inputProps) => <Input {...inputProps} />}
    </InputMask>
  );
}
