import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { HR } from '../../common/styles';
import { Asset } from '../../types';
import { Header } from './MintModal.styles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { utils } from 'ethers';
import CreatorsDesigns from '../../contracts/CreatorsDesigns.json';
import { Contract } from '@ethersproject/contracts';
import { useContractFunction } from '@usedapp/core';
import { Toast } from '../Toast/toast';

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
  },
};

type MintModalProps = {
  asset: Asset;
}

export const MintModal: React.FC<ReactModal.Props & MintModalProps> = (props) => {
  const {
    asset
  } = props;

  const [currentStep, setCurrentStep] = useState<number>(1);

  const contractInterface = new utils.Interface(CreatorsDesigns.abi);
  const contract = new Contract(asset.collection?.address!, contractInterface);
  const { send, state } = useContractFunction(contract, 'mint');

  useEffect(() => {
    if (state.status === 'Fail' || state.status === 'Exception') {
      Toast.error(state.errorMessage || 'There was an error');
    } else if (state.status === 'Success') {
      Toast.success('You have successfully minted this token.');
    }
  }, [state.status, state.errorMessage]);

  const _handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const _handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const steps = [
    <Step1 key={1} asset={asset} mint={send} handleNextStep={_handleNextStep} />,
    <Step2 key={2} state={state} handlePreviousStep={_handlePreviousStep} handleClose={props.onRequestClose} />
  ];

  return (
    <Modal
      style={customStyles}
      {...props}
    >
      <Header>
        <h2>Minting <b>&quot;{asset.name}&quot;</b></h2>
        <CloseLineIcon onClick={props.onRequestClose} />
      </Header>
      <HR />
      {steps[currentStep - 1]}
    </Modal>
  )
}
