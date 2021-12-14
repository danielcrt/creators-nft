import Link from 'next/link';
import React from 'react'
import Modal from 'react-modal';
import { HR } from '../../common/styles';
import { Button } from '../Button';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
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
  return (
    <Modal
      style={customStyles}
      {...props}
    >
      <Header>
        <h2><b>Please switch to a wallet that supports Ethereum network</b></h2>
        <CloseLineIcon />
      </Header>
      <HR />
      <p>In order to trade items, connect to a Ethereum network wallet. Please lock your current wallet and connect with a wallet that supports Ethereum network.</p>
      <HR />
      <Link href='/connect-wallet'>
        <a>
          <Button variant='primary'>
            Connect wallet
          </Button>
        </a>
      </Link>
    </Modal>
  )
}
