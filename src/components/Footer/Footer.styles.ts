import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 45px;
  padding-bottom: 45px;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: ${props => props.theme.colors.secondary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p, em {
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 1em;
    color: #4f4f4f;
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  letter-spacing: 1px;
`;

export const SocialMediaIcons = styled.div`
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  svg {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;
`;