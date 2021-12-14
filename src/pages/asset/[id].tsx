import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Container, HR } from '../../common/styles'
import { ActivityTable } from '../../components/ActivityTable'
import { Button } from '../../components/Button'
import { Avatar } from '../../components/Card/Card.styles'
import { MintModal } from '../../components/MintModal'
import { AssetType } from '../../types/AssetType'
import { Actions, AssetDetails, AssetGrid, BlockchainContainer, Header, ImageContainer, OwnerContainer, StoreImage, StoresContainer, StoresTitle } from './asset.styles'

const Asset: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isMinted = Math.random() < 0.5;

  const token: AssetType = {
    name: 'Name 1',
    media: { original: '/assets/images/sample.jpeg' },
    owner: '0x123123',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  };

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

  return (
    <React.Fragment>
      <Container>
        <AssetGrid>
          <ImageContainer>
            <img src='/assets/images/sample.jpeg' />
          </ImageContainer>
          <AssetDetails>
            <Header>
              <h1>{token.name}</h1>
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
              <Avatar>
                <img src='/assets/images/logo.png' />
                <a>@creators.designs</a>
              </Avatar>
            </OwnerContainer>
            <HR />
            <BlockchainContainer>
              <h3><b>Blockchain:</b></h3>
              <Avatar>
                <img src='/assets/images/ethereum-icon.png' />
                <p><b>Ethereum</b></p>
              </Avatar>
            </BlockchainContainer>
            <h3><b>Description</b></h3>
            <p>{token.description}</p>
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