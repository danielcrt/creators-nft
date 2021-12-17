import React from 'react'
import { Container } from '../../common/styles';
import { ButtonsContainer, Logo, Menu, MenuList, MenuListItem, StyledHeader, Wrapper } from './Header.styles';
import Link from 'next/link'
import { ProfileMenu } from './ProfileMenu';

export const Header: React.FC = () => {

  return (
    <StyledHeader>
      <Container>
        <Wrapper>
          <Link href='/'>
            <a><Logo src={'/assets/images/logo.png'} /></a>
          </Link>
          <Menu>
            <MenuList>
              <Link href='/#explore'>
                <MenuListItem>
                  <a>Explore</a>
                </MenuListItem>
              </Link>
              <Link href='/contact'>
                <MenuListItem>
                  <a>Contact</a>
                </MenuListItem>
              </Link>
            </MenuList>
          </Menu>
          <ButtonsContainer>
            <ProfileMenu />
          </ButtonsContainer>
        </Wrapper>
      </Container>
    </StyledHeader>
  )
}
