import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: relative;
  background: #fff;
  border-bottom: 1px solid #e2eef1;
  width: 100%;
  white-space: nowrap;
`;

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  grid-gap: 20px;
  gap: 20px;
`;

export const Logo = styled.img`
  height: 48px;
  border-radius: 50px;
`;

export const Menu = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex: 1;
`;

export const MenuList = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

export const MenuListItem = styled.li`
  margin-right: 0;
  margin-left: 20px;
  a {
    color: inherit;
    white-space: nowrap;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: block;
`;

