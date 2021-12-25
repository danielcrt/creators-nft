import { getChainById, Hardhat, Localhost, Mainnet, Ropsten, useEthers } from '@usedapp/core'
import React from 'react'
import { UnsupportedNetworkModal } from '../UnsupportedNetworkModal';
import { StyledLink, Wrapper } from './InfoBanner.styles'

export const InfoBanner: React.FC = () => {
  const { chainId } = useEthers();

  if (!chainId || chainId === Mainnet.chainId) return null;

  const chain = getChainById(chainId);
  const ethChains = [Mainnet.chainId, Ropsten.chainId, Localhost.chainId, Hardhat.chainId];
  if (chainId === Ropsten.chainId && process.env.NEXT_PUBLIC_ROPSTEN_HOSTNAME === window.location.hostname) {
    return null;
  }

  return (
    <Wrapper>
      <p>Your wallet is connected to the {chain?.chainName} {chain?.isTestChain ? 'test' : ''} network. To use this website on Ropsten, please switch to <StyledLink target='_blank' rel='noreferrer' href={`https://${process.env.NEXT_PUBLIC_ROPSTEN_HOSTNAME}`}>{process.env.NEXT_PUBLIC_ROPSTEN_HOSTNAME}</StyledLink></p>
      <UnsupportedNetworkModal isOpen={!ethChains.includes(chainId)} />
    </Wrapper >
  )
}
