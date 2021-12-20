import { shortenAddress, useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react'
import { Container } from '../../common/styles';
import { Card } from '../../components/Card';
import { CardSkeleton } from '../../components/Card/CardSkeleton';
import { CardsGrid } from '../../components/Marketplace/Marketplace.styles';
import { UnexpectedError } from '../../components/UnexpectedError';
import { usePaginateAssets } from '../api/asset/assets';
import { Content, Header, LoadMoreButton, StyledAvatar, Wrapper } from './profile.styles';
import { useAuth } from '../../hooks/AuthProvider';

const Profile: NextPage = () => {
  const { account } = useEthers();
  const { user } = useAuth();
  const { assets, error, isLoadingMore, size, setSize, isReachingEnd } = usePaginateAssets({
    owner: account
  });

  const _renderCards = () => {
    if (assets.length === 0) {
      return <React.Fragment>
        <br />
        <h2>You have no assets yet. Start collecting <Link href='/#explore'><a>here</a></Link></h2>;
      </React.Fragment>
    }
    if (!assets) {
      return <CardsGrid>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </CardsGrid>;
    }

    return <CardsGrid>
      {assets.map((asset, idx) => <Card key={idx} asset={asset} />)}
    </CardsGrid >;
  }

  if (!user) return null;
  if (error) return <UnexpectedError message={'No assets found'} />
  return (
    <Wrapper>
      <Header>
        <StyledAvatar
          image='/assets/images/profile_100.jpeg'
          size={100}
          textPosition='bottom'
          text={<h2>{user ? shortenAddress(user?.address) : ''}</h2>} />
      </Header>
      <Content>
        <Container>
          <h1>Your collection</h1>
          {_renderCards()}
          {!isReachingEnd &&
            <LoadMoreButton
              variant='primary'
              disabled={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? 'Loading...'
                : 'Load more'}
            </LoadMoreButton>
          }
        </Container>
      </Content>
    </Wrapper>
  )



}
export default Profile;