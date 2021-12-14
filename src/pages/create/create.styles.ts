import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const AssetGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 40px 0 80px 0;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
  max-height: 500px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    cursor: pointer;
    filter: alpha(opacity=0);
    opacity: 0;
  }
`;

export const AssetDetails = styled.div`
  max-width: 767px;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

export const Currency = styled.span`
  padding: 0 20px;
  font-weight: bold;
  border-right: 1px solid rgba(55, 55, 55, 0.2);
`;