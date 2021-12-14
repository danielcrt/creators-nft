import type { AppProps } from 'next/app'
import React from 'react'
import { Header } from '../components/Header'
import { GlobalStyle } from './_app.styles'
import { ThemeProvider } from 'styled-components';
import { creatorsTheme } from '../common/creatorsTheme';
import { Footer } from '../components/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return <React.Fragment>
    <ThemeProvider theme={creatorsTheme}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  </React.Fragment>
}

export default MyApp
