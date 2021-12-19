import { BigNumber } from '@ethersproject/bignumber';
import { Bytes } from '@ethersproject/bytes';

export type CreatorsMetadata = {
  tokenId: string;
  tokenURI: string;
  creator: string;
  price: BigNumber;
  expiresAt: number;
  signature: Bytes;
}