import { BigNumber } from '@ethersproject/bignumber';
import { Bytes } from '@ethersproject/bytes';

export type CreatorsDesignsMetadata = {
  tokenId: BigNumber;
  tokenURI: string;
  creator: string;
  price: BigNumber;
  expiresAt: number;
  signature: Bytes;
}