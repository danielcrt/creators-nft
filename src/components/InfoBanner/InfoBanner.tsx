import { getChainById, Goerli, Hardhat, Kovan, Localhost, Mainnet, Rinkeby, Ropsten, useEthers } from '@usedapp/core'
import React from 'react'
import { UnsupportedNetworkModal } from '../UnsupportedNetworkModal';
import { StyledLink, Wrapper } from './InfoBanner.styles'

export const InfoBanner: React.FC = () => {
  const { chainId } = useEthers();

  if (!chainId || chainId === Mainnet.chainId) return null;

  const chain = getChainById(chainId);
  const ethChains = [Mainnet.chainId, Ropsten.chainId, Localhost.chainId, Hardhat.chainId];

  return (
    <Wrapper>
      <p>Your wallet is connected to the {chain?.chainName} test network. To use this website on Ropsten, please switch to <StyledLink target='_blank' rel='noreferrer' href={`https://ropsten-nft.thecreatorsdesigns.com`}>ropsten-nft.thecreatorsdesigns.com</StyledLink></p>
      <UnsupportedNetworkModal isOpen={!ethChains.includes(chainId)} />
    </Wrapper >
  )
}
