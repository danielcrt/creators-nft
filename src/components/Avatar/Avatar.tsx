import React from 'react'
import { Container, StyledImage } from './Avatar.styles'

export type AvatarProps = {
  text?: JSX.Element | string;
  image: JSX.Element | string;
  textPosition?: 'right' | 'bottom'
} & AvatarOptionalProps;

type AvatarOptionalProps = {
  size?: number | string;
}
const defaultProps: AvatarOptionalProps = {
  size: 32
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    text,
    size,
    image
  } = props;

  return (
    <Container {...props}>
      {typeof image === 'string' ?
        <StyledImage src={image} alt='' width={size} height={size} />
        :
        image
      }
      {text}
    </Container>
  )
}

Avatar.defaultProps = defaultProps;

export { Avatar };