import React, { InputHTMLAttributes } from 'react'
import { Wrapper, StyledInput, Label, Container, Error } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prepend?: JSX.Element;
  suffix?: JSX.Element;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    prepend,
    suffix,
    error,
    ...inputProps
  } = props;

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Wrapper>
        {prepend}
        <StyledInput ref={ref} {...inputProps} />
        {suffix}
      </Wrapper>
      <Error>{error}</Error>
    </Container>
  )
});

Input.displayName = 'Input';

export default Input;
