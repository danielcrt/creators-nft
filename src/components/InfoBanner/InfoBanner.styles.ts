import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 4px;
`;