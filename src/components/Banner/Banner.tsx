import React from "react";
import { Container } from "../../common/styles";
import { SearchBar } from "../SearchBar";
import { BannerLeft, BannerRight, Wrapper, Title, Grid } from "./Banner.styles";

export type BannerProps = {
} 

export const Banner: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Grid>
          <BannerLeft>
            <Title>
              Discover digital art and collect NFTs
            </Title>
            <p>raroin is a shared liquidity NFT market smart contract which is used by multiple websites to provide the users the best possible experience.
            </p>
            <SearchBar />
          </BannerLeft>
          <BannerRight>
            <img src='/assets/images/banner_right.png' />
          </BannerRight>
        </Grid>
      </Container>
    </Wrapper>
  );
}