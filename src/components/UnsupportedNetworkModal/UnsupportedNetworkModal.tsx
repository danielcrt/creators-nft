import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Modal from 'react-modal';
import { HR } from '../../common/styles';
import { useAuth } from '../../hooks/AuthProvider';
import { logout } from '../../pages/api/user/auth';
import { Button } from '../Button';
import { Header } from './UnsupportedNetworkModal.styles';

const customStyles: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
};

export const UnsupportedNetworkModal: React.FC<ReactModal.Props> = (props) => {
  const router = useRouter();
  const { deactivate } = useEthers();
  const { mutateUser } = useAuth();

  const _handleLogout = async () => {
    deactivate();
    await logout();
    mutateUser(undefined);
    router.push('/connect-wallet');
  }

  return (
    <Modal
      style={customStyles}
      {...props}
    >
      <Header>
        <h2><b>Please switch to a wallet that supports Ethereum network</b></h2>
      </Header>
      <HR />
      <p>In order to trade items, connect to a Ethereum network wallet. Please lock your current wallet and connect with a wallet that supports Ethereum network.</p>
      <HR />
      <Button variant='primary'
        onClick={_handleLogout}>
        Logout
      </Button>
    </Modal>
  )
}
