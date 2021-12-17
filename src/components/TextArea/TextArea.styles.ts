import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  background: #e2eef1;
  border-radius: 20px;
  position: relative;
  transition: all .2s ease-in-out;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid #e2eef1;
    background-color: #fff;
  
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  color: #232226;
  background: transparent;
  border: 1px solid transparent;
  width: 100%;
  padding: 15px;
  line-height: 1.5;
  font-weight: 400;
  font-size: inherit;
  border-radius: 20px;
  position: relative;
  -webkit-appearance: none;
  transition: all .4s cubic-bezier(.4,0,.2,1);
  outline: 0;
`;

export const Label = styled.label`
  margin: 8px;
  font-size: 18px
`;

export const Error = styled.span`
  color: red;
`; 