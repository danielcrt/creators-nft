import React from 'react'
import { Container } from './Avatar.styles'

export type AvatarProps = {
  text?: JSX.Element | string;
  image: JSX.Element | string;
  size?: number;
  textPosition?: 'right' | 'bottom'
}
export const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    text,
    image
  } = props;
  return (
    <Container {...props}>
      {typeof image === 'string' ?
        <img src={image} alt='' />
        :
        image
      }
      {text}
    </Container>
  )
}
