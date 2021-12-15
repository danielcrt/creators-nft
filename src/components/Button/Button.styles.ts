import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from './Button';

interface StyledButtonType extends ButtonProps {
  theme: DefaultTheme
}

export const StyledButton = styled.button<StyledButtonType>`
    display: flex;
    width: ${props => props.fullWidth === true ? '100%' : 'auto'};
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: ${props => props.variant === 'primary' ? '#fff' : props.theme.colors.primary};
    padding: 11px 23px;
    min-height: 20px;
    line-height: 20px;
    transition: all .4s cubic-bezier(.4,0,.2,1);
    font-weight: 500;
    font-size: 18px;
    text-decoration: none;
    vertical-align: middle;
    outline: none;
    position: relative;
    text-align: center;
    border-radius: 100px;
    overflow: hidden;
    will-change: transform,box-shadow;
    border: none;
    background: ${props => {

    if (props.disabled) {
      return 'grey';
    }
    if (props.variant !== undefined) {
      return props.theme.colors[props.variant];
    }
    return 'none';
  }};

    &:hover {
      background-color: ${props => {
    if (props.disabled) {
      return 'grey';
    }
    if (props.variant !== undefined) {
      return props.theme.colors[`${props.variant}Accent`];
    }
    return 'none';
  }};
      outline: none;
      box-shadow: inherit;
      opacity: .9;
    }
  `;
;
