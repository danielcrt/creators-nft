import styled from 'styled-components';

export const Container = styled.div`
padding: 40px 0 80px 0;
max-width: 800px;
margin: 0 auto;
`;

export const Table = styled.div`
width: 100%;
box-sizing: border-box;
flex: 0 0 auto;
padding-right: 1rem;
padding-left: 1rem;
overflow-x: auto;
`;

export const Wrapper = styled.div`
border: 1px solid #f0f0f0;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 10px 23px -4px #f4f4f6;
overflow-x: auto;
font-size: 18px;
`;

export const Header = styled.div`
position: sticky;
top: 0px;
z-index: 1;
display: flex;
font-weight: 900;
`;

export const Row = styled.div`
display: flex;
`;

export const Cell = styled.div`
border-bottom: 1px solid #f0f0f0;
display: flex;
flex: 1 0 100px;
overflow-x: auto;
padding: 16px 4px;
flex-basis: 150px;

&:first-child {
  padding-left: 16px;
}
`;


export const Title = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`;