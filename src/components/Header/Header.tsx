import React from 'react'
import { Container } from '../../common/styles';
import { ButtonsContainer, Logo, Menu, MenuList, MenuListItem, StyledHeader, Wrapper } from './Header.styles';
import Link from 'next/link'
import { Button } from '../Button';
import { shortenAddress, useEthers } from '@usedapp/core';
import { Avatar } from '../Card/Card.styles';
import { logout } from '../../pages/api/user/auth';
import { useGlobalState } from '../../hooks/AuthContext';

export const Header: React.FC = () => {
  const { deactivate } = useEthers();
  const { user } = useGlobalState();

  const _logout = async () => {
    deactivate();
    await logout();
  }
  const _renderProfileMenu = () => {
    if (user) {
      return <React.Fragment>
        <Avatar onClick={_logout}>
          <img src='/assets/images/logo.png' />
          {shortenAddress(user.address)}
        </Avatar>
      </React.Fragment>
    }
    return <Link href='/connect-wallet'>
      <a><Button variant='primary'>
        Connect wallet
      </Button>
      </a>
    </Link>;
  }

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
            {_renderProfileMenu()}
          </ButtonsContainer>
        </Wrapper>
      </Container>
    </StyledHeader>
  )
}
