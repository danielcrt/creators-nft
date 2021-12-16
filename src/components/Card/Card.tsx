import Link from 'next/link'
import React from 'react'
import { HR } from '../../common/styles'
import { AssetType } from '../../types/AssetType'
import { Button } from '../Button'
import { Avatar, Body, Footer, Header, ImageContainer, Title, Wrapper } from './Card.styles'

export type CardProps = {
  token: AssetType
}

export const Card: React.FC<CardProps> = (props) => {
  const { token } = props;
  return (
    <Wrapper>
      <Header>
        <Avatar>
          <img src='/assets/images/logo.png' />
          <Link href={`/users/${token.owner}`}>
            <a>@creatorsdesigns</a>
          </Link>
        </Avatar>
      </Header>
      <Link href={`/asset/1`}>
        <Body>
          <ImageContainer>
            <img src={token.media?.['original']} />
          </ImageContainer>
          <Title>{token.name}</Title>
        </Body>
      </Link>
      <HR />
      <Footer>
        <Link href={`/contact?offer=1&name=${token.name}`}>
          <a>
            <Button variant='secondary'>
              Make offer
            </Button>
          </a>
        </Link>
        <Link href={`/asset/1`}>
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
