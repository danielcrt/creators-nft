import React, { InputHTMLAttributes } from 'react'
import { Container, InputContainer, StyledCheckbox, StyledLabel } from './Checkbox.styles';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';

type CheckboxProps = {
  label: JSX.Element | string | null;
}

export const Checkbox: React.FC<CheckboxProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const {
    label
  } = props;

  return (
    <Container>
      <InputContainer>
        <StyledCheckbox type='checkbox' id={props.name} {...props} />
        {props.checked && <CheckLineIcon />}
      </InputContainer>
      {label && <StyledLabel htmlFor={props.name}>{label}</StyledLabel>}
    </Container>
  )
}
