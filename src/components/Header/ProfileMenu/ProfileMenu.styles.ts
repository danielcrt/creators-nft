import styled from "styled-components";

export const PopupContainer = styled.div`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 10px 23px -4px #f4f4f6;
  min-width: 200px;
`;

export const MenuItem = styled.div`
  background: #fff;
  cursor: pointer;
  padding: 16px;
  transition: 0.4s;

  &:hover {
    background: ${props => props.theme.colors.secondary}
  }
`; 