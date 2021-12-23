import { useEthers } from '@usedapp/core';
import { addDays, format, getTime, parse, parseISO } from 'date-fns';
import React, { ChangeEvent, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import Modal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { KeyedMutator } from 'swr';
import { HR } from '../../common/styles';
import { DEFAULT_BACKEND_DATE_TIME_FORMAT, MIN_ASSET_ETH_PRICE, signAsset } from '../../common/utils';
import { createListing, CreateListingRequest, deleteListing } from '../../pages/api/asset/listings';
import { Asset } from '../../types';
import { ApiResponse } from '../../types/ApiResponse';
import { CreatorsDesignsMetadata } from '../../types/CreatorsDesignsMetadata';
import { Button } from '../Button'
import { Input } from '../Input';
import Restricted from '../Restricted/Restricted';
import { Toast } from '../Toast/toast';
import { Currency, Header } from './ListButton.styles';
import { utils, BigNumber } from 'ethers';

const customStyles: ReactModal.Styles = {
  content: {
    overflow: 'inherit',
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

export type ListButtonProps = {
  asset: Asset;
  mutateAsset: KeyedMutator<ApiResponse<Asset>>
}
export const ListButton: React.FC<ListButtonProps> = (props) => {
  const {
    asset,
    mutateAsset
  } = props;
  const { chainId, library, account } = useEthers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [cancelling, setCancelling] = useState<boolean>(false);

  const _toggleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  const [listing, setListing] = useState<CreateListingRequest>({
    price: 0,
    expires_at: format(addDays(new Date(), 1), DEFAULT_BACKEND_DATE_TIME_FORMAT),
    signature: undefined
  });

  const _handleChange = (event: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    const { name, value } = event.target;
    setListing({
      ...listing,
      [name]: value
    });
  }
  const _handleDateChange = (date: Date) => {
    setListing({
      ...listing,
      expires_at: format(date, DEFAULT_BACKEND_DATE_TIME_FORMAT)
    });
  }

  const _signListing = async (): Promise<string> => {
    if (!asset.collection || !asset.collection.name || !asset.collection.address || !listing.expires_at || !listing.price) {
      return '';
    }

    const assetMetadata: CreatorsDesignsMetadata = {
      tokenId: BigNumber.from(asset.id),
      tokenURI: asset.ipfs || '',
      creator: account!,
      price: utils.parseEther(String(listing.price)),
      expiresAt: getTime(parse(listing.expires_at, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date())),
      signature: []
    };

    const signature: string = await signAsset(chainId!, assetMetadata, library!.getSigner(), asset.collection.name, asset.collection.address);

    return signature;
  }

  const _handleListing = async () => {
    setSubmitting(true);
    let signature;
    try {
      signature = await _signListing();
    } catch (error: any) {
      Toast.error(error.message);
      setSubmitting(false);
      return;
    }

    const response = await createListing(asset.id, { ...listing, signature: signature });
    setSubmitting(false);
    if (!response.error && !response.networkError) {
      mutateAsset();
      _toggleIsOpen();
      Toast.success('Listing has been successfully created');
    }
  }

  const _cancelListing = async () => {
    if (!asset.listing) {
      return;
    }
    setCancelling(true);
    const response = await deleteListing(asset.id, asset.listing.id);
    setCancelling(false);

    if (!response.error && !response.networkError) {
      mutateAsset();
    }
  }

  const _renderListingButton = () => {
    if (asset.listing?.id) {
      return cancelling ?
        <p>Cancelling...</p> :
        <Button
          variant='primary'
          onClick={_cancelListing}>
          Cancel listing
        </Button>;
    }
    return <Button
      variant='primary'
      onClick={_toggleIsOpen}>
      List
    </Button>;
  }

  return (
    <Restricted to='asset.listing.create'>
      {_renderListingButton()}
      <Modal
        isOpen={isOpen}
        style={customStyles}
      >
        <Header>
          <h2>List &quot;<b>{asset.name}</b>&quot;</h2>
          <CloseLineIcon onClick={_toggleIsOpen} />
        </Header>
        <HR />
        <Input
          name='price'
          type='text'
          placeholder='Price'
          value={listing.price}
          label='Price'
          onChange={_handleChange}
          prepend={<Currency>ETH</Currency>}
          error={(listing.price && Number(listing.price) < MIN_ASSET_ETH_PRICE) ? `Minimum price is ${MIN_ASSET_ETH_PRICE} ETH` : null} />
        <ReactDatePicker
          minDate={addDays(new Date(), 1)}
          customInput={<Input placeholder='Expiration date' label='Expire date' />}
          selected={listing.expires_at ? parseISO(listing.expires_at) : null}
          onChange={_handleDateChange} />
        <HR />
        {submitting ?
          <p>Waiting your signature...</p>
          :
          <Button
            variant='primary'
            onClick={_handleListing}>
            List
          </Button>
        }
      </Modal>
    </Restricted>
  )
}
