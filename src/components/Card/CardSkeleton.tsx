import Link from 'next/link'
import React from 'react'
import { HR } from '../../common/styles'
import { Body, Footer, ImageContainer, Title, Header, Wrapper } from './Card.styles'
import Skeleton from 'react-loading-skeleton';
import { Avatar } from '../Avatar';

export const CardSkeleton: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Avatar
          image={
            <React.Fragment>
              <Skeleton circle={true} width={24} /> &nbsp;&nbsp;
            </React.Fragment>
          }
          text={<Skeleton width={100} />} />
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
