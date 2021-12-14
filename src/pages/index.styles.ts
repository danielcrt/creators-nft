import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Main = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`;

export const FooterLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const TitleLink = styled.div`
  color: #0070f3;
  text-decoration: none;
`;
