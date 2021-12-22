import { NextPage } from 'next'
import Link from 'next/link';
import React from 'react'
import { Container } from '../../common/styles';
import { Wrapper } from './404.styles';

const Page404: NextPage = () => {
  return (
    <Wrapper>
      <Container>
        <h1>404</h1>
        <h2>Page not found. Start exploring <Link href='/'><a>new collections</a></Link>.</h2>
      </Container>
    </Wrapper>
  )
}

export default Page404;