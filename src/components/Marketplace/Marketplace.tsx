import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container } from '../../common/styles'
import { HomeContext } from '../../pages/index.context'
import { Card } from '../Card'
import { CardsGrid, Title, Wrapper } from './Marketplace.styles'
import { CardSkeleton } from '../Card/CardSkeleton'

export const Marketplace: React.FC = () => {
  const { searchValue } = useContext(HomeContext);
  const exploreRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const tokens = [
    {
      name: 'Name 1',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 2',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 3',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 4',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 1',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 2',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 3',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 4',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 1',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 2',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 3',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
    {
      name: 'Name 4',
      media: { original: '/assets/images/sample.jpeg' },
      owner: '0x123123',
    },
  ];

  useEffect(() => {
    exploreRef.current?.scrollIntoView();
  }, [searchValue]);

  const _loadAssets = () => {
    setLoading(false);
  }

  useEffect(() => {
    _loadAssets();
  }, []);

  const _renderTitle = () => {
    if (searchValue) {
      return <Title>Search result for: "{searchValue}"</Title>;
    }
    return <Title>All Categories</Title>;
  }

  const _renderCards = () => {
    if (tokens.length === 0) {
      return <React.Fragment>
        <br />
        <h2>No assets found.</h2>;
      </React.Fragment>
    }
    if (loading) {
      return <CardsGrid>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </CardsGrid>;
    }
    return <CardsGrid>
      {tokens.map((token, idx) => <Card key={idx} token={token} />)}
    </CardsGrid>;
  }

  return (
    <Wrapper ref={exploreRef}>
      <Container>
        {_renderTitle()}
        {_renderCards()}
      </Container>
    </Wrapper>
  )
}
