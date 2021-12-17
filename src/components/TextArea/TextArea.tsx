import React, { TextareaHTMLAttributes } from 'react'
import { Wrapper, StyledTextArea, Label, Container, Error } from './TextArea.styles';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    label,
    error,
    ...textAreaProps
  } = props;

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Wrapper>
        <StyledTextArea {...textAreaProps} />
      </Wrapper>
      <Error>{error}</Error>
    </Container>
  )
}
