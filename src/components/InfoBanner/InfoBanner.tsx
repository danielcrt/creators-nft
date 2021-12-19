import { getChainById, Goerli, Hardhat, Kovan, Localhost, Mainnet, Rinkeby, Ropsten, useEthers } from '@usedapp/core'
import React from 'react'
import { UnsupportedNetworkModal } from '../UnsupportedNetworkModal';
import { Wrapper } from './InfoBanner.styles'

export const InfoBanner: React.FC = () => {
  const { chainId } = useEthers();

  if (!chainId || chainId === Mainnet.chainId) return null;

  const chain = getChainById(chainId);
  const ethChains = [Mainnet.chainId, Goerli.chainId, Rinkeby.chainId, Kovan.chainId, Ropsten.chainId, Localhost.chainId, Hardhat.chainId];

  return (
    <Wrapper>
      <p>Your wallet is connected to the {chain?.chainName} test network</p>
      <UnsupportedNetworkModal isOpen={!ethChains.includes(chainId)} />
    </Wrapper>
  )
}
