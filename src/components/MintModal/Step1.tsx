import { useEthers } from '@usedapp/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Error, HR } from '../../common/styles'
import { Asset } from '../../types'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { utils, BigNumber } from 'ethers';
import { DEFAULT_BACKEND_DATE_TIME_FORMAT } from '../../common/utils';
import { getTime, parse } from 'date-fns';
import { CreatorsMetadata } from '../../types/CreatorsMetadata';

type Step1Props = {
  asset: Asset;
  mint: (...args: any[]) => Promise<void>;
  handleNextStep: () => void;
}

export const Step1: React.FC<Step1Props> = (props) => {
  const {
    asset,
    mint,
    handleNextStep
  } = props;

  const { account, library } = useEthers();
  const [hasFunds, setHasFunds] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    const _retrieveBalance = async () => {
      if (!account) {
        return;
      }
      const newBalance = await library?.getBalance(account) || BigNumber.from(0);
      setHasFunds(newBalance.gte(BigNumber.from(utils.parseEther(String(asset.listing?.price)))));
    }
    _retrieveBalance();
  }, [account]);

  const _handleMint = async (): Promise<void> => {
    handleNextStep();
    const assetMetadata: CreatorsMetadata = {
      tokenId: BigNumber.from(asset.id),
      tokenURI: asset.ipfs || '',
      price: utils.parseEther(String(asset.listing?.price)),
      creator: asset.owner!,
      expiresAt: getTime(parse(asset.listing?.expires_at!, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date())),
      signature: utils.arrayify(asset.listing?.signature!)!
    };
    console.log(assetMetadata);
    

    await mint(account, assetMetadata, {
      from: account,
      value: utils.parseEther(String(asset.listing?.price))
    });
  }

  const _handleAgreed = () => {
    setAgreed(!agreed);
  }

  return (
    <React.Fragment>
      <p>Price: {Number(asset.listing?.price)} ETH</p>
      {!hasFunds && <Error>Not enough funds.</Error>}
      <HR />
      <Checkbox
        onChange={_handleAgreed}
        name='tos'
        checked={agreed}
        label={<React.Fragment>By checking this box, I agree to <Link href='/terms-of-service'><a target="_blank">Terms of service</a></Link></React.Fragment>} />
      <br />
      <Button
        disabled={!agreed || !hasFunds}
        variant='primary'
        onClick={_handleMint}>
        Mint
      </Button>
    </React.Fragment>
  )
}
