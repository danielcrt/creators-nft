import React, { useContext, useEffect, useRef } from 'react'
import { Container } from '../../common/styles'
import { HomeContext } from '../../pages/index.context'
import { Card } from '../Card'
import { CardsGrid, LoadMoreButton, Title, Wrapper } from './Marketplace.styles'
import { CardSkeleton } from '../Card/CardSkeleton'
import { usePaginateAssets } from '../../pages/api/asset/assets';
import { UnexpectedError } from '../UnexpectedError'

export const Marketplace: React.FC = () => {
  const { searchValue } = useContext(HomeContext);
  const exploreRef = useRef<HTMLDivElement>(null);
  const { assets, error, isLoadingMore, size, setSize, isReachingEnd } = usePaginateAssets(searchValue ? {
    name: {
      '$like': searchValue
    }
  } : {});

  useEffect(() => {
    exploreRef.current?.scrollIntoView();
  }, [searchValue]);

  const _renderTitle = () => {
    if (searchValue) {
      return <Title>Search result for: &quot;{searchValue}&quot;</Title>;
    }
    return <Title>All Categories</Title>;
  }

  const _renderCards = () => {
    if (assets.length === 0) {
      return <React.Fragment>
        <br />
        <h2>No assets found.</h2>;
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
    </CardsGrid>;
  }

  if (error) return <UnexpectedError message={'No assets found'} />
  return (
    <Wrapper ref={exploreRef}>
      <Container>
        {_renderTitle()}
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
    </Wrapper>
  )
}
