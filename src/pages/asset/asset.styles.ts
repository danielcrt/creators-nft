import styled from "styled-components";

export const AssetGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 40px 0 80px 0;
`;

export const ImageContainer = styled.div`
  border-radius: 50px;
  overflow: hidden;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const AssetDetails = styled.div`
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    flex: 1
  }
`;

export const Actions = styled.div`
  
`;

export const StoresContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  img {
    width: 100%;
    height: 100px;
    object-fit: contain;
  }
`;

export const StoresTitle = styled.h2`
  padding: 0 20px
`;

export const StoreImage = styled.div`
  cursor: pointer;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${props => props.theme.colors.primary}
  }
  transition: 0.4s;
`;

export const BlockchainContainer = styled.div`
  display:flex;
  align-items: center;
`;

export const OwnerContainer = styled.div`
  display:flex;
  align-items: center;
`;