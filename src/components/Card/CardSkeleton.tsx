import Link from 'next/link'
import React from 'react'
import { HR } from '../../common/styles'
import { Avatar, Body, Footer, Header, ImageContainer, Title, Wrapper } from './Card.styles'
import Skeleton from 'react-loading-skeleton';

export const CardSkeleton: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Avatar>
          <Skeleton circle={true} width={24} /> &nbsp;&nbsp;
          <Skeleton width={100} />
        </Avatar>
      </Header>
      <Link href={`/asset/1`}>
        <Body>
          <ImageContainer>
            <Skeleton height={234} />
          </ImageContainer>
          <Title><Skeleton /></Title>
        </Body>
      </Link>
      <HR />
      <Footer>
        <Skeleton width={80} />
        <Skeleton width={80} />
      </Footer>
    </Wrapper>
  )
}
