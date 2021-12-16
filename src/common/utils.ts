
type ChainList = {
  [key: number]: string;
}

export const ETHEREUM_CHAINS: ChainList = {
  1: 'https://mainnet.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  5: 'https://goerli.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
}