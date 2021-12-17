import { shortenAddress, useEthers } from '@usedapp/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Popup from 'reactjs-popup';
import { HR } from '../../../common/styles';
import { useAuth } from '../../../hooks/AuthProvider';
import { logout } from '../../../pages/api/user/auth';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { MenuItem, PopupContainer } from './ProfileMenu.styles';

const contentStyle = {
  border: 'none',
  paddingTop: 8,
  minWidth: 200
}

export const ProfileMenu: React.FC = () => {
  const router = useRouter();
  const { user, mutateUser } = useAuth();
  const { deactivate } = useEthers();

  const _logout = async () => {
    deactivate();
    await logout();
    mutateUser(undefined);
    router.push('/');
  }

  const _renderPopupTrigger = () => {
    return <div>
      <Link href='/profile'>
        <a>
          <Avatar
            image='/assets/images/profile_100.jpeg'
            text={user!.address ? shortenAddress(user!.address) : ''} />
        </a>
      </Link>
    </div>
  }

  if (!user) {
    return <Link href='/connect-wallet'>
      <a><Button variant='primary'>
        Connect wallet
      </Button>
      </a>
    </Link>;
  }
  return <Popup
    open={true}
    trigger={_renderPopupTrigger()}
    position='bottom right'
    on='hover'
    closeOnDocumentClick
    mouseLeaveDelay={300}
    mouseEnterDelay={0}
    contentStyle={contentStyle}
    arrow={false}
  >
    <PopupContainer>
      <Link href='/profile'><a><MenuItem>Profile</MenuItem></a></Link>
      <HR />
      <MenuItem onClick={_logout}>Logout</MenuItem>
    </PopupContainer>
  </Popup>;
}
