import { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Error, HR } from '../../../common/styles'
import { Input } from '../../../components/Input'
import { TextArea } from '../../../components/TextArea'
import { AssetGrid, ImageContainer, AssetDetails, ImageSquare } from '../create/create.styles'
import { Button } from '../../../components/Button'
import { useRouter } from 'next/router'
import { UpdateAssetRequest, useAsset, updateAsset, deleteAsset } from '../../api/asset/assets'
import Restricted from '../../../components/Restricted/Restricted'
import { Toast } from '../../../components/Toast/toast'
import { ResponseErrorMeta } from '../../../types'
import Page404 from '../../404/index.page'
import { AssetSkeleton } from '../asset.skeleton'
import { Header } from './edit.styles'

const initialFormState = {
  name: '',
  description: '',
  media: undefined,
};

const AssetEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const assetId = id as string;

  const { asset, error } = useAsset(assetId);
  const [errors, setErrors] = useState<ResponseErrorMeta>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [form, setForm] = useState<UpdateAssetRequest>(initialFormState);
  const [mediaData, setMediaData] = useState<string | null>();

  useEffect(() => {
    if (!asset) {
      return;
    }
    setForm({
      name: asset?.name,
      description: asset?.description,
      media: undefined,
    });
  }, [asset])

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
    return <img src={mediaData ? mediaData : (asset?.media?.[0].media[1000] || '')} alt='Media' />
  }

  const _handleSave = async () => {
    setSubmitting(true);
    const response = await updateAsset(assetId, {
      ...form,
    });
    setSubmitting(false);
    if (!response.error && !response.networkError) {
      Toast.success('Asset successfully updated');
      setErrors({});
    } else if (response.error) {
      setErrors(response.error.meta);
    }
  }

  const _handleDelete = async () => {
    setDeleting(true);
    const response = await deleteAsset(assetId);
    if (!response.error && !response.networkError) {
      Toast.success('Asset successfully deleted');
      router.push('/');
    } else if (response.error) {
      setDeleting(false);
      Toast.error('There was an error deleting the asset.');
    }
  }

  const _renderDeleteButton = () => {
    if (asset?.token_id) {
      return;
    }
    if (deleting) {
      return <p>Deleting...</p>
    }
    return <Button
      variant='danger'
      onClick={_handleDelete}>
      Delete
    </Button>;
  }

  if (!asset && !error) {
    return <AssetSkeleton />
  }
  if (!asset) return <Page404 />;
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
            <Header>
              <h1>{asset.name}</h1>
              <div>
                {_renderDeleteButton()}
              </div>
            </Header>
            <HR />
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

export default AssetEdit;