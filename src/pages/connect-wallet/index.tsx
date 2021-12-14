import { NextPage } from 'next';
import React from 'react'
import { Container } from '../../common/styles';
import { UnsupportedNetworkModal } from '../../components/UnsupportedNetworkModal';
import { Content, WalletDescription, WalletImage, WalletTitle } from './connect-wallet.styles';
import { WalletsGrid, WalletCard } from './connect-wallet.styles';

const ConnectWallet: NextPage = () => {
  const wallets = [
    {
      name: 'Metamask',
      image: '/assets/images/wallets/metamask.svg',
      description: 'Connect with Metamask (most popular)'
    },
    {
      name: 'Coinbase Wallet',
      image: '/assets/images/wallets/coinbase.svg',
      description: 'Connect with your Coinbase wallet'
    },
    {
      name: 'Fortmatic',
      image: '/assets/images/wallets/fortmatic.svg',
      description: 'Connect with your Fortmatic account'
    },
    {
      name: 'Wallet Connect',
      image: '/assets/images/wallets/walletconnect.svg',
      description: 'Scan with Wallet Connect to connect',
    }
  ];

  return (
    <React.Fragment>
      <Container>
        <Content>
          <h1>You need an Ethereum wallet to use this website.</h1>
          <p>Connect with one of our available wallet info providers or create a new one.</p>
          <WalletsGrid>
            {wallets.map(wallet =>
              <WalletCard key={wallet.image}>
                <WalletImage>
                  <img src={wallet.image} />
                </WalletImage>
                <WalletTitle>{wallet.name}</WalletTitle>
                <WalletDescription>{wallet.description}</WalletDescription>
              </WalletCard>
            )}
          </WalletsGrid>
        </Content>
      </Container>
    </React.Fragment>
  )
}

export default ConnectWallet;