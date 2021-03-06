import Image from "next/image";
import styled, { DefaultTheme } from "styled-components";
import { AvatarProps } from ".";

export interface AvatarContainerProps extends AvatarProps {
  theme: DefaultTheme
}

export const Container = styled.div<AvatarContainerProps>`
  display: ${props => props.textPosition === 'bottom' ? 'block' : 'flex'};
  align-items: center;
  ${props => props.textPosition === 'bottom' ? 'text-align: center;' : ''};
  gap: 4px;

  a {
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 100%; 
    white-space: nowrap;
  }
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
`;