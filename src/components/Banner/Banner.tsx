import Image from "next/image";
import React from "react";
import { Container } from "../../common/styles";
import { SearchBar } from "../SearchBar";
import { BannerLeft, BannerRight, Wrapper, Title, Grid, StyledImage } from "./Banner.styles";

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
            <p>Creators Designs is a shared liquidity NFT market smart contract which is used by multiple websites to provide the users the best possible experience.
            </p>
            <br />
            <SearchBar />
          </BannerLeft>
          <BannerRight>
            <StyledImage src='/assets/images/banner_right.png' alt='banner' />
          </BannerRight>
        </Grid>
      </Container>
    </Wrapper>
  );
}