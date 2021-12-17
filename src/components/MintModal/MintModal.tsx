import React from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { HR } from '../../common/styles';
import { Header } from './MintModal.styles';

const customStyles: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    maxWidth: 500,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
};

export const MintModal: React.FC<ReactModal.Props> = (props) => {
  return (
    <Modal
      style={customStyles}
      {...props}
    >
      <Header>
        <h2><b>Mint asset</b></h2>
        <CloseLineIcon onClick={props.onRequestClose}/>
      </Header>
      <HR />
    </Modal>
  )
}
