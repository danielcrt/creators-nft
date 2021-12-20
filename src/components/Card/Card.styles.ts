import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background: #fff;    
  border: 1px solid #e2eef1;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 17px 13px 0 rgb(25 44 75 / 2%);
  margin: auto auto 30px;
  max-width: 30rem;
  overflow: hidden;
  transition: all .4s cubic-bezier(.4,0,.2,1);

  &:hover img {
    transform: scale(1.1);
  }
`;

export const Header = styled.div`
  padding-bottom: 4px;
`;

export const ImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  img {
    cursor: pointer;
    object-fit: cover; 
    height: 100%;
    width: 100%;
    transition: all .6s cubic-bezier(.4,0,.2,1);
  }
`;
export const Body = styled.div`
  
`;

export const Title = styled.h5`
  cursor: pointer;
  line-height: 1.5;
  letter-spacing: 0;
`;

export const Footer = styled.div`
  display:flex;
  justify-content: space-around;
`;