import { ChainId } from "@usedapp/core";
import { JsonRpcSigner } from '@ethersproject/providers';
import { CreatorsMetadata } from "../types/CreatorsMetadata";

type ChainList = {
  [key: number]: string;
}

export const ETHEREUM_CHAINS: ChainList = {
  1: 'https://mainnet.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  5: 'https://goerli.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
}

export const DEFAULT_BACKEND_DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const MIN_ASSET_ETH_PRICE = 0.00005;

const Types = {
  CreatorsPatternsMetadata: [
    { name: 'tokenId', type: 'string' },
    { name: 'tokenURI', type: 'string' },
    { name: 'creator', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'expiresAt', type: 'uint256' },
  ]
};

export const signAsset = async (chainId: ChainId, asset: CreatorsMetadata, account: JsonRpcSigner, eip712Name: string, verifyingContract: string): Promise<string> => {
  return (await account._signTypedData(
    {
      name: eip712Name,
      version: "1",
      chainId,
      verifyingContract
    }, Types, asset));
}
