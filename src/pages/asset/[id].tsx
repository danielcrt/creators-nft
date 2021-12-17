import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, HR } from '../../common/styles'
import { ActivityTable } from '../../components/ActivityTable'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { MintModal } from '../../components/MintModal'
import Page404 from '../404'
import { getAsset } from '../api/asset/assets'
import { Actions, AssetDetails, AssetGrid, BlockchainContainer, Header, ImageContainer, OwnerContainer, StoreImage, StoresContainer, StoresTitle } from './asset.styles'

const Asset: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { asset, error, mutate } = getAsset(id as string);
  const isMinted = Math.random() < 0.5;

  const _renderPrice = () => {
    return <h2>On sale for: 0.05 ETH</h2>
  }

  const _renderBuyOptions = () => {
    if (!isMinted) {
      return <React.Fragment>
        {_renderPrice()}
        <br />
        <Button variant='primary' fullWidth={true}
          onClick={_handleMint}>
          Be the first owner
        </Button>
      </React.Fragment>
    }
    return <React.Fragment>
      <StoresTitle>View on:</StoresTitle>
      <StoresContainer>
        <StoreImage>
          <img src='/assets/images/etherscan-logo.png' />
        </StoreImage>
        <StoreImage>
          <img src='/assets/images/open-sea-logo.png' />
        </StoreImage>
      </StoresContainer>
    </React.Fragment>
  }

  const _handleMint = () => {
    setIsOpen(true);
  }

  const _closeModal = () => {
    setIsOpen(false);
  }

  if (!id || !asset) return <Page404 />;
  return (
    <React.Fragment>
      <Container>
        <AssetGrid>
          <ImageContainer>
            <img src='/assets/images/sample.jpeg' />
          </ImageContainer>
          <AssetDetails>
            <Header>
              <h1>{asset.name}</h1>
              <Actions>
                <Link href={`/asset/${id}/edit`}>
                  <a><Button variant='primary'>
                    Edit
                  </Button>
                  </a>
                </Link>
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
        isOpen={isOpen}
        onRequestClose={_closeModal}
      />
    </React.Fragment>
  )
}

export default Asset;