import styled from "styled-components";
import { TextInput } from "../../common/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e2eef1;
  height: 3rem;
  width: 20rem;
  border-radius: 100px;
  position: relative;
  transition: all .2s ease-in-out;
  border: 2px solid transparent;

  &:focus-within {
    border: 2px solid #e2eef1;
    background-color: #fff;
  }
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  height: 100%;
  background: transparent;
  padding-left: 2rem;
`;

export const Label = styled.label`
  margin: 8px;
  font-size: 18px
`;

export const Error = styled.span`
  color: red;
`; 