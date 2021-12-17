import Link from 'next/link'
import React from 'react'
import { HR } from '../../common/styles'
import { Asset } from '../../types/Asset'
import { Button } from '../Button'
import { Body, Footer, ImageContainer, Title, Wrapper, Header } from './Card.styles'
import { Avatar } from '../Avatar'

export type CardProps = {
  asset: Asset
}

export const Card: React.FC<CardProps> = (props) => {
  const { asset } = props;
  return (
    <Wrapper>
      <Header>
        <Avatar
          image={'/assets/images/logo.png'}
          text={<Link href={`/users/${asset.owner}`}>
            <a>@creatorsdesigns</a>
          </Link>} />
      </Header>
      <Link href={`/asset/1`}>
        <Body>
          <ImageContainer>
            <img src={asset.media?.[0].media['500']} />
          </ImageContainer>
          <Title>{asset.name}</Title>
        </Body>
      </Link>
      <HR />
      <Footer>
        <Link href={`/contact?assetId=${asset.id}&assetName=${asset.name}`}>
          <a>
            <Button variant='secondary'>
              Make offer
            </Button>
          </a>
        </Link>
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
