import Link from 'next/link'
import React from 'react'
import { HR } from '../../common/styles'
import { Asset } from '../../types/Asset'
import { Button } from '../Button'
import { Body, Footer, ImageContainer, Title, Wrapper, Header, StyledImage } from './Card.styles'
import { Avatar } from '../Avatar'
import { shortenAddress, useEthers } from '@usedapp/core'

export type CardProps = {
  asset: Asset
}

export const Card: React.FC<CardProps> = (props) => {
  const { account } = useEthers();
  const { asset } = props;
  return (
    <Wrapper>
      <Header>
        <Avatar
          image={'/assets/images/logo.png'}
          text={
            <a>{asset.owner ? shortenAddress(asset.owner) : '@creatorsdesigns'}</a>
          } />
      </Header>
      <Link href={`/asset/${asset.id}`} passHref>
        <Body>
          <ImageContainer>
            <StyledImage src={asset.media?.[0].media['500'] || ''} alt={`asset-${asset.id}`} />
          </ImageContainer>
          <Title>{asset.name}</Title>
        </Body>
      </Link>
      <HR />
      <Footer>
        {!asset.token_id &&
          <Link href={`/contact?assetId=${asset.id}&assetName=${asset.name}`}>
            <a>
              <Button variant='secondary'>
                Make offer
              </Button>
            </a>
          </Link>
        }
        <Link href={`/asset/${asset.id}`}>
          <a>
            <Button variant='primary'>
              View
            </Button>
          </a>
        </Link>
      </Footer>
    </Wrapper>
  )
}
