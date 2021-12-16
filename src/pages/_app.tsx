import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { GlobalStyle } from './_app.styles'
import { ThemeProvider } from 'styled-components';
import { creatorsTheme } from '../common/creatorsTheme';
import { Footer } from '../components/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { DAppProvider, Mainnet } from '@usedapp/core';
import { ETHEREUM_CHAINS } from '../common/utils';
import { ToastContainer } from 'react-toastify';
import { GlobalStateProvider, User } from '../hooks/AuthContext';
import { useSelfUsers } from './api/user/users';

Modal.setAppElement("#__next");

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: ETHEREUM_CHAINS[Mainnet.chainId],
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  const { user, error } = useSelfUsers();

  return <React.Fragment>
    <ThemeProvider theme={creatorsTheme}>
      <GlobalStyle />
      <GlobalStateProvider>
        <DAppProvider config={config}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </DAppProvider>
      </GlobalStateProvider>
      <ToastContainer />
    </ThemeProvider>
  </React.Fragment>
}

export default MyApp
