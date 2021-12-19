import { Mainnet, useEthers } from '@usedapp/core'
import { format, parse } from 'date-fns'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, HR } from '../../common/styles'
import { DEFAULT_BACKEND_DATE_TIME_FORMAT } from '../../common/utils'
import { ActivityTable } from '../../components/ActivityTable'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { ListButton } from '../../components/ListButton'
import { MintModal } from '../../components/MintModal'
import Restricted from '../../components/Restricted/Restricted'
import Page404 from '../404'
import { getAsset } from '../api/asset/assets'
import { AssetSkeleton } from './asset.skeleton'
import { Actions, AssetDetails, AssetGrid, BlockchainContainer, Header, ImageContainer, OwnerContainer, StoreImage, StoresContainer, StoresTitle } from './asset.styles'

const Asset: NextPage = () => {
  const router = useRouter();
  const { chainId } = useEthers();

  const { id } = router.query;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { asset, error, mutate } = getAsset(id as string);
  console.log(asset);

  const _renderPrice = (): JSX.Element | null => {
    if (!asset?.listing?.expires_at || !asset?.listing?.price) {
      return null;
    }
    return <h2>On sale for: {Number(asset?.listing?.price)} ETH until {
      format(parse(asset?.listing?.expires_at, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date()), 'do MMMM yyyy')
    }</h2>
  }

  const _renderBuyOptions = () => {
    if (!asset) {
      return null;
    }
    if (!asset.token_id && asset.listing?.price && asset.listing?.expires_at) {
      return <React.Fragment>
        {_renderPrice()}
        <br />
        <Button variant='primary' fullWidth={true}
          onClick={_handleMint}>
          Be the first owner
        </Button>
      </React.Fragment>
    }
    let etherscanBaseUrl = 'etherscan.io';
    if (chainId !== Mainnet.chainId) {
      etherscanBaseUrl = 'goerli.' + etherscanBaseUrl;
    }

    return <React.Fragment>
      <StoresTitle>View on:</StoresTitle>
      <StoresContainer>
        <a href={`https://${etherscanBaseUrl}/token/${asset.collection?.address}?a=${asset.token_id}#inventory`} target='_blank'>
          <StoreImage>
            <img src='/assets/images/etherscan-logo.png' />
          </StoreImage>
        </a>
        <a href={`https://opensea.io/assets/${asset.collection?.address}/${asset.token_id}`}>

          <StoreImage>
            <img src='/assets/images/open-sea-logo.png' />
          </StoreImage>
        </a>
      </StoresContainer>
    </React.Fragment>
  }

  const _handleMint = () => {
    setIsOpen(true);
  }

  const _closeModal = () => {
    setIsOpen(false);
  }

  if (!asset && !error) {
    return <AssetSkeleton />;
  }
  if (!asset) return <Page404 />;

  return (
    <React.Fragment>
      <Container>
        <AssetGrid>
          <ImageContainer>
            <img src={asset.media?.[0].media['500']} alt={asset.name} />
          </ImageContainer>
          <AssetDetails>
            <Header>
              <h1>{asset.name}</h1>
              <Actions>
                <Restricted to='asset.edit.own' resource={asset}>
                  <Link href={`/asset/${id}/edit`}>
                    <a>
                      <Button variant='secondary'>
                        Edit
                      </Button>
                    </a>
                  </Link>
                </Restricted>
                <ListButton
                  asset={asset}
                  mutateAsset={mutate}
                />
              </Actions>
            </Header>
            <OwnerContainer>
              <b>owned by:</b>
              <Avatar
                image='/assets/images/logo.png'
                text={<a>@creators.designs</a>}
              />
            </OwnerContainer>
            <HR />
            <BlockchainContainer>
              <h3><b>Blockchain:</b></h3>
              <Avatar
                image='/assets/images/ethereum-icon.png'
                text={<p><b>Ethereum</b></p>} />
            </BlockchainContainer>
            <h3><b>Description</b></h3>
            <p>{asset.description}</p>
            <HR />
            {_renderBuyOptions()}
          </AssetDetails>
        </AssetGrid>
      </Container>
      <HR />
      <Container>
        <ActivityTable />
      </Container>
      <MintModal
        asset={asset}
        isOpen={isOpen}
        onRequestClose={_closeModal}
      />
    </React.Fragment>
  )
}

export default Asset;