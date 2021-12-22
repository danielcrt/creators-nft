import React from 'react'
import { Container } from '../../common/styles';
import { ButtonsContainer, Logo, Menu, MenuList, MenuListItem, StyledHeader, Wrapper } from './Header.styles';
import Link from 'next/link'
import { ProfileMenu } from './ProfileMenu';
import Restricted from '../Restricted/Restricted';

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
              <Link href='/#explore' passHref>
                <MenuListItem>
                  <a>Explore</a>
                </MenuListItem>
              </Link>
              <Restricted to='asset.create'>
                <Link href='/asset/create' passHref>
                  <MenuListItem>
                    <a>Create</a>
                  </MenuListItem>
                </Link>
              </Restricted>
              <Link href='/contact' passHref>
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
