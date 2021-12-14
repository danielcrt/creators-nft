import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Banner } from '../components/Banner';
import { Marketplace } from '../components/Marketplace';
import { HomeContext } from './index.context';

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const value = { searchValue, setSearchValue };

  return (
    <HomeContext.Provider value={value}>
      <Banner />
      <Marketplace />
    </HomeContext.Provider>
  )
}

export default Home
