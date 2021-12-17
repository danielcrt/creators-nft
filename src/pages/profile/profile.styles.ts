import styled from "styled-components";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";

export const Wrapper = styled.div`
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 300px; 
  width: 100%;
  background-image: url(/assets/images/profile-banner.jpeg); 
`;

export const Content = styled.div`
  padding-top: 80px;
`;

export const CollectionGrid = styled.div`
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const StyledAvatar = styled(Avatar)`
  position: absolute;
  bottom: -80px;
`;

export const LoadMoreButton = styled(Button)`
  margin: 0 auto;
`;