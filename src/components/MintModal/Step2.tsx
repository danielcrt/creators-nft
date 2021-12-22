import { TransactionStatus } from '@usedapp/core'
import React from 'react'
import Loader from 'react-loader-spinner';
import { useTheme } from 'styled-components';
import { Button } from '../Button';


type Step2Props = {
  state: TransactionStatus;
  handlePreviousStep: () => void;
  handleClose?: (event: React.MouseEvent) => void;
}

export const Step2: React.FC<Step2Props> = (props) => {
  const {
    state,
    handlePreviousStep,
    handleClose
  } = props;
  const theme = useTheme();

  if (state.status === 'Mining') {
    return <React.Fragment>
      <p>Transaction in progress. You can follow its status <a target={'_blank'} href={`https://etherscan.io/tx/${state.transaction?.hash}`} rel='noreferrer'>here</a></p>
      <p>You can safely close this window. The transaction is running in background.</p>
      <Loader
        type='Hearts'
        color={theme.colors.primary}
        height={100}
        width={100}
      />
    </React.Fragment>
  }
  if (state.status === 'Fail' || state.status === 'Exception') {
    return <React.Fragment>
      <p>{state.errorMessage || 'There was an error'}</p>
      <p>You can retry by going back to <a href='#' onClick={handlePreviousStep}>the previous step</a></p>
      <br />
      <Button variant='primary' onClick={handlePreviousStep}>Go back</Button>
    </React.Fragment>;
  }
  if (state.status === 'Success') {
    return <React.Fragment>
      <p>You have successfully minted this token.</p>
      <p>The system will reflect the updates automatically in 1 hour.</p>
      <br />
      <Button variant='primary' onClick={handleClose}>Ok</Button>
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <Loader type='Hearts'
        color={theme.colors.primary}
        height={80}
        width={80} />
      <h1>Buy this item</h1>
      <p>To buy this item you need to send a transaction</p>
    </React.Fragment>
  )
}
