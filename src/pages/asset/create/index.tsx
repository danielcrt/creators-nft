import { NextPage } from 'next'
import React, { ChangeEvent, useState } from 'react'
import { Container, Error } from '../../../common/styles'
import { Input } from '../../../components/Input'
import { TextArea } from '../../../components/TextArea'
import { ListingType } from '../../../types/ListingType'
import { AssetGrid, ImageContainer, AssetDetails, ImageSquare } from './create.styles'
import { Button } from '../../../components/Button'
import { useRouter } from 'next/router'
import { createAsset, CreateAssetRequest, getAsset } from '../../api/asset/assets'
import Restricted from '../../../components/Restricted/Restricted'
import { Toast } from '../../../components/Toast/toast'
import { ResponseErrorMeta } from '../../../types'

const initialFormState = {
  name: '',
  description: '',
  media: undefined,
};

const Create: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (id) {
    const { asset, error } = getAsset(id as string);
  }

  const [errors, setErrors] = useState<ResponseErrorMeta>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<CreateAssetRequest>(initialFormState);
  const [mediaData, setMediaData] = useState<string | null>();

  const _renderSaveButton = () => {
    if (submitting) {
      return <p>Saving...</p>
    }
    return <Button
      variant='primary'
      onClick={_handleSave}>
      Save
    </Button>;
  }

  const _handleSelectedMedia = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    if (errors['media']) {
      const newErrors = { ...errors };
      delete newErrors['media'];
      setErrors(newErrors);
    }

    setForm({
      ...form,
      media: files[0]
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setMediaData(reader.result as string);
    });
    reader.readAsDataURL(files[0]);
  }

  const _handleChangeAsset = (event: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
    const { name, value } = event.target;
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    setForm({
      ...form,
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
      <br />
      {errors['media'] && <Error>{errors['media']}</Error>}
    </React.Fragment>;
  }

  const _handleSave = async () => {
    setSubmitting(true);
    const response = await createAsset({
      ...form,
    });
    setSubmitting(false);
    if (!response.error && !response.networkError) {
      Toast.success('Asset successfully created');
      setForm(initialFormState);
      setMediaData(null);
      router.push(`/asset/${response.data.id}`)
    } else if (response.error) {
      setErrors(response.error.meta);
    }
  }
  return (
    <Restricted to='asset.create'>
      <Container>
        <AssetGrid>
          <ImageSquare>
            <ImageContainer error={errors.hasOwnProperty('media')}>
              {_renderImageContent()}
              <input
                name='media'
                type='file'
                onChange={_handleSelectedMedia} />
            </ImageContainer>
          </ImageSquare>
          <AssetDetails>
            <Input
              name='name'
              type='text'
              placeholder='Name'
              value={form.name}
              label='Name'
              onChange={_handleChangeAsset}
              error={errors['name']}
            />
            <TextArea
              value={form.description}
              name='description'
              placeholder='Description'
              label='Description'
              onChange={_handleChangeAsset}
              error={errors['description']} />
            <br />
            {errors['media'] && <Error>{errors['media']}</Error>}
            {_renderSaveButton()}
          </AssetDetails>
        </AssetGrid>
      </Container>
    </Restricted>
  )
}

export default Create;