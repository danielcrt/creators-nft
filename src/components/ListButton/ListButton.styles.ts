import styled from "styled-components";

export const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
`;

export const Currency = styled.span`
  padding: 0 20px;
  font-weight: bold;
  border-right: 1px solid rgba(55, 55, 55, 0.2);
`;