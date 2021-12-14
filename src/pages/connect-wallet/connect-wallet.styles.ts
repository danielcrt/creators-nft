import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
`;

export const WalletsGrid = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 767px;
  gap: 20px;
`;

export const WalletCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  cursor: pointer;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  text-align: center;
  box-shadow: 0 10px 23px -4px #f4f4f6;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 20px;

    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  }
`;

export const WalletImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const WalletTitle = styled.h2`
  font-weight: bold;
  font-size: 24px;
`;

export const WalletDescription = styled.p`
`;

