import type { AppProps } from 'next/app'
import React from 'react'
import { Header } from '../components/Header'
import { GlobalStyle } from './_app.styles'
import { ThemeProvider } from 'styled-components';
import { creatorsTheme } from '../common/creatorsTheme';
import { Footer } from '../components/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from 'react-modal';
import { DAppProvider, Mainnet } from '@usedapp/core';
import { ETHEREUM_CHAINS } from '../common/utils';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../hooks/AuthProvider';
import { InfoBanner } from '../components/InfoBanner/InfoBanner';

Modal.setAppElement("#__next");

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: ETHEREUM_CHAINS[Mainnet.chainId],
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return <React.Fragment>
    <ThemeProvider theme={creatorsTheme}>
      <GlobalStyle />
      <DAppProvider config={config}>
        <AuthProvider>
          <Header />
          <InfoBanner />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </DAppProvider>
      <ToastContainer />
    </ThemeProvider>
  </React.Fragment>
}

export default MyApp
