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


export const StyledLink = styled.a`
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
  &:hover {
    color: ${props => props.theme.colors.secondaryAccent};
  }
`;