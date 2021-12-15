import React from 'react'
import { Wrapper } from './UnexpectedError.styles'

export type UnexpectedErorrProps = {
  message?: string
}

export const UnexpectedError: React.FC<UnexpectedErorrProps> = (props) => {
  return (
    <Wrapper>
      <h1>{props.message ? props.message : 'There was an unexpected error. Please come back later.'}</h1>
    </Wrapper>
  )
}
