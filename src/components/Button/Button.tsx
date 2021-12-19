import React, { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './Button.styles';

export type ButtonVariants = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  icon?: JSX.Element
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { icon, children, ...buttonProps } = props;

  return (
    <StyledButton {...buttonProps}>
      {children} {icon ? icon : null}
    </StyledButton>
  )
}