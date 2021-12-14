import React, { TextareaHTMLAttributes } from 'react'
import { Wrapper, StyledTextArea, Label, Container } from './TextArea.styles';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    label,
    ...textAreaProps
  } = props;

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Wrapper>
        <StyledTextArea {...textAreaProps} />
      </Wrapper>
    </Container>
  )
}
