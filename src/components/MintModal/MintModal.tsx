import { useContractFunction, useEthers } from '@usedapp/core';
import React, { useEffect } from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { HR } from '../../common/styles';
import { Asset } from '../../types';
import { Button } from '../Button';
import { Header } from './MintModal.styles';
import CreatePatterns from '../../contracts/CreatePatterns.json';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';
import { DEFAULT_BACKEND_DATE_TIME_FORMAT } from '../../common/utils';
import { getTime, parse } from 'date-fns';
import { CreatorsMetadata } from '../../types/CreatorsMetadata';
import Loader from 'react-loader-spinner';
import { Toast } from '../Toast/toast';
import { DefaultTheme, useTheme } from 'styled-components';

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
    flexDirection: 'column',
    borderRadius: 50
  },
};

type MintModalProps = {
  asset: Asset;
}

export const MintModal: React.FC<ReactModal.Props & MintModalProps> = (props) => {
  const {
    asset
  } = props;
  const theme = useTheme();
  const { account } = useEthers();

  const contractInterface = new utils.Interface(CreatePatterns.abi);
  const contract = new Contract(asset.collection?.address!, contractInterface);
  const { send, state } = useContractFunction(contract, 'mint');

  const _handleMint = async (): Promise<void> => {
    const assetMetadata: CreatorsMetadata = {
      tokenId: asset.id,
      tokenURI: asset.id,
      price: utils.parseEther(String(asset.listing?.price)),
      creator: asset.owner!,
      expiresAt: getTime(parse(asset.listing?.expires_at!, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date())),
      signature: utils.arrayify(asset.listing?.signature!)!
    };

    await send(account, assetMetadata, {
      from: account,
      value: utils.parseEther(String(asset.listing?.price))
    });
  }

  const _renderStatus = (): JSX.Element | null => {
    if (state.status === 'Mining') {
      return <React.Fragment>
        <p>Transaction in progress...</p>
        <Loader
          type='Hearts'
          color={theme.colors.secondary}
          height={100}
          width={100}
        />
      </React.Fragment>
    } else if (state.status === 'Fail' || state.status === 'Exception') {
      <React.Fragment>
        <p>{state.errorMessage || 'There was an error'}</p>
      </React.Fragment>
    } else if (state.status === 'Success') {
      return <React.Fragment>
        <p>You have successfully minted this token.</p>
      </React.Fragment>
    }
    return null;
  }

  useEffect(() => {
    if (state.status === 'Fail' || state.status === 'Exception') {
      Toast.error(state.errorMessage || 'There was an error');
    } else if (state.status === 'Success') {
      Toast.success('You have successfully minted this token.');
    }
  }, [state.status]);

  return (
    <Modal
      style={customStyles}
      {...props}
    >
      <Header>
        <h2>Mint <b>"{asset.name}"</b></h2>
        <CloseLineIcon onClick={props.onRequestClose} />
      </Header>
      <HR />
      {_renderStatus()}
      <br />
      {state.status === 'None' &&
        <Button
          variant='primary'
          onClick={_handleMint}>
          Mint
        </Button>
      }
    </Modal>
  )
}
