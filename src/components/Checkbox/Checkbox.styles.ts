import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  gap: 4px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: inline-flex;
  border-radius: 5px;

  svg {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.colors.primary};
  }
`;

export const StyledCheckbox = styled.input`
  appearance: none;
  border: 2px solid rgb(229, 232, 235);
  cursor: pointer;
  height: 24px;
  min-width: 24px;
  max-width: 24px;
  border-radius: 5px;
  background-color: #fff;
  transition: box-shadow 0.2s ease 0s;
  outline: none;

  &:hover, &:focus-within {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

export const StyledLabel = styled.label`
  cursor: pointer;
`;