import React from 'react'
import { Container, HR } from '../../common/styles'
import { Avatar } from '../../components/Avatar'
import { AssetDetails, AssetGrid, BlockchainContainer, Header, ImageContainer, OwnerContainer } from './asset.styles'
import Skeleton from 'react-loading-skeleton';

export const AssetSkeleton = () => {
  return (
    <React.Fragment>
      <Container>
        <AssetGrid>
          <ImageContainer>
            <Skeleton width={'100%'} height={'100%'} />
          </ImageContainer>
          <AssetDetails>
            <Header>
              <h1><Skeleton width={200} /></h1>
            </Header>
            <OwnerContainer>
              <Skeleton />
              <Avatar
                image={<Skeleton height={24} width={24} circle={true} />}
                text={<Skeleton width={100} />}
              />
            </OwnerContainer>
            <HR />
            <BlockchainContainer>
              <h3><Skeleton /></h3>
              <Avatar
                image={<Skeleton circle={true} />}
                text={<Skeleton />} />
            </BlockchainContainer>
            <h3><Skeleton /></h3>
            <Skeleton count={10} />
          </AssetDetails>
        </AssetGrid>
      </Container>
    </React.Fragment>
  )
}
