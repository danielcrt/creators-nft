import { NextPage } from 'next'
import React, { ChangeEvent, useState } from 'react'
import { Container } from '../../common/styles'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { ListingType } from '../../types/ListingType'
import { AssetType } from '../../types/AssetType'
import { AssetGrid, ImageContainer, AssetDetails, Currency } from './create.styles'
import { Button } from '../../components/Button'
import DatePicker from 'react-datepicker';
import { addDays, parseISO, format } from 'date-fns';

const minPrice = 0.00005;

const Create: NextPage = () => {
  const [asset, setAsset] = useState<AssetType>({
    name: '',
    description: '',
  });
  const [media, setMedia] = useState<File>();
  const [mediaData, setMediaData] = useState<string | null>();
  const [listing, setListing] = useState<ListingType>({
    price: '',
    expires_at: '',
  });

  const _handleSelectedMedia = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    setMedia(files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setMediaData(reader.result as string);
    });
    reader.readAsDataURL(files[0]);
  }
  const _handleChangeAsset = (event: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    const { name, value } = event.target;

    setAsset({
      ...asset,
      [name]: value
    });
  }

  const _handleChangeListing = (event: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    const { name, value } = event.target;
    setListing({
      ...listing,
      [name]: value
    });
  }

  const _renderImageContent = () => {
    if (mediaData) {
      return <React.Fragment>
        <img src={mediaData} />
      </React.Fragment>;
    }
    return <React.Fragment>
      <h3>Drag and drop your file</h3>
      <p>JPG, PNG, GIF, WEBP or JPEG . Max 100mb.</p>
      <br />
      <p>or choose a file</p>
      <br />
      <Button variant='secondary'>
        Browse files
      </Button>
    </React.Fragment>;
  }
  const _handleDateChange = (date: Date) => {
    console.log(date);

    setListing({
      ...listing,
      expires_at: format(date, 'yyyy-MM-dd')
    });
  }

  const _handleSave = () => {
    console.log(asset);
    console.log(media);
    console.log(listing);
  }
  return (
    <React.Fragment>
      <Container>
        <AssetGrid>
          <ImageContainer>
            {_renderImageContent()}
            <input
              name='media'
              type='file'
              onChange={_handleSelectedMedia} />
          </ImageContainer>
          <AssetDetails>
            <Input
              name='name'
              type='text'
              placeholder='Name'
              value={asset.name}
              label='Name'
              onChange={_handleChangeAsset} />
            <TextArea
              value={asset.description}
              name='description'
              placeholder='Description'
              label='Description'
              onChange={_handleChangeAsset} />
            <Input
              name='price'
              type='text'
              placeholder='Price'
              value={listing.price}
              label='Price'
              onChange={_handleChangeListing}
              prepend={<Currency>ETH</Currency>}
              error={(listing.price && Number(listing.price) < minPrice) ? `Minimum price is ${minPrice}` : null} />
            <DatePicker
              minDate={addDays(new Date(), 1)}
              customInput={<Input placeholder='Expiration date' label='Expire date' />}
              selected={listing.expires_at ? parseISO(listing.expires_at) : null}
              onChange={_handleDateChange} />
            <br />
            <br />
            <Button variant='primary'
              onClick={_handleSave}>
              Create
            </Button>
          </AssetDetails>
        </AssetGrid>
      </Container>
    </React.Fragment>
  )
}

export default Create;