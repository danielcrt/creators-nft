import React, { ChangeEvent, useState } from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import { HR } from '../../common/styles';
import { MIN_ASSET_ETH_PRICE } from '../../common/utils';
import { Input } from '../Input';
import { Currency, Header } from './ListingModal.styles';
import DatePicker from 'react-datepicker';
import { addDays, parseISO, format } from 'date-fns';
import { CreateListingRequest } from '../../pages/api/asset/listings';
import Restricted from '../Restricted/Restricted';

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

export const ListingModal: React.FC<ReactModal.Props> = (props) => {
  const [listing, setListing] = useState<CreateListingRequest>({
    price: undefined,
    expires_at: undefined,
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
      expires_at: format(date, 'yyyy-MM-dd')
    });
  }

  return (
    <Restricted to='asset.listing.create'>
      <Modal
        style={customStyles}
        {...props}
      >
        <Header>
          <h2><b>List asset</b></h2>
          <CloseLineIcon onClick={props.onRequestClose} />
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
        <DatePicker
          minDate={addDays(new Date(), 1)}
          customInput={<Input placeholder='Expiration date' label='Expire date' />}
          selected={listing.expires_at ? parseISO(listing.expires_at) : null}
          onChange={_handleDateChange} />
      </Modal>
    </Restricted>
  )
}
