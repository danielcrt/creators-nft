import { Mainnet, useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import React from 'react'
import { Container } from '../../common/styles';
import { Content, WalletDescription, WalletImage, WalletTitle } from './connect-wallet.styles';
import { WalletsGrid, WalletCard } from './connect-wallet.styles';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ETHEREUM_CHAINS } from '../../common/utils';
import { useRouter } from 'next/router';
import { Toast } from '../../components/Toast/toast';
import { request, RequestResponse, verify } from '../api/user/auth';
import { useAuth } from '../../hooks/AuthProvider';

type Wallet = {
  key: string;
  name: string;
  image: string;
  description: string;
  handleConnection: () => void;
}

const ConnectWallet: NextPage = () => {
  const router = useRouter();
  const { activateBrowserWallet, activate, account, library } = useEthers();
  const { mutateUser } = useAuth();

  const _signNone = async (requestResponse: RequestResponse) => {
    if (!account) {
      return;
    }
    const signature = await _handleSignMessage(requestResponse.nonce);
    const response = await verify(requestResponse.id, {
      address: account,
      signature: signature,
      locale: 'en'
    });

    if (!response.error && !response.networkError) {
      mutateUser();
      Toast.success('Welcome');
      router.push('/profile');
    }
  }

  const _handleSignMessage = async (nonce: string): Promise<string> => {
    const signature = await library!.getSigner().signMessage(`https://nft.thecreatorsdesigns.com/
    
    Welcome,
    
    This is a verification procedure. To continue please 'sign' this signature request for account ownership verification.
    
    
    Nonce:
    ${nonce}`);
    return signature;
  };

  const _handleMetamask = async () => {
    try {
      await activateBrowserWallet(undefined, true);
      if (account) {
        const response = await request({
          address: account,
          os: 'web'
        });
        _signNone(response.data);
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  }

  const _handleCoinbase = async () => {
    const walletlink = new WalletLinkConnector({ url: ETHEREUM_CHAINS[Mainnet.chainId], appName: 'Creators Patterns' })
    activate(walletlink);
  }

  const _handleFortmatic = async () => {
    const fortmatic = new FortmaticConnector({ apiKey: process.env.NEXT_PUBLIC_FORTMATIC_KEY || '', chainId: Mainnet.chainId });
    activate(fortmatic);
  }

  const _handleWalletConnect = async () => {
    const walletconnect = new WalletConnectConnector({ rpc: ETHEREUM_CHAINS });
    activate(walletconnect);
  }

  const wallets: Wallet[] = [
    {
      key: 'metamask',
      name: 'Metamask',
      image: '/assets/images/wallets/metamask.svg',
      description: 'Connect with Metamask (most popular)',
      handleConnection: _handleMetamask
    },
    {
      key: 'coinbase',
      name: 'Coinbase Wallet',
      image: '/assets/images/wallets/coinbase.svg',
      description: 'Connect with your Coinbase wallet',
      handleConnection: _handleCoinbase
    },
    {
      key: 'fortmatic',
      name: 'Fortmatic',
      image: '/assets/images/wallets/fortmatic.svg',
      description: 'Connect with your Fortmatic account',
      handleConnection: _handleFortmatic
    },
    {
      key: 'wallet-connect',
      name: 'Wallet Connect',
      image: '/assets/images/wallets/walletconnect.svg',
      description: 'Scan with Wallet Connect to connect',
      handleConnection: _handleWalletConnect
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
              <WalletCard key={wallet.key} onClick={wallet.handleConnection}>
                <WalletImage>
                  <img src={wallet.image} alt={wallet.name} width={120} height={120} />
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