import React from 'react';
import { Wrapper, Title, SocialMediaIcons, Content, Copyright } from './Footer.styles';
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon';
import PinterestLineIcon from 'remixicon-react/PinterestLineIcon';
import FacebookCircleLineIcon from 'remixicon-react/FacebookCircleLineIcon';
import { Container } from '../../common/styles';

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Title>Follow My Journey</Title>
          <SocialMediaIcons>
            <a target='_blank' href='https://www.instagram.com/creatorsdesigns/'>
              <InstagramLineIcon size={28} />
            </a>
            <a target='_blank' href='https://ro.pinterest.com/creatorsdesigns/_created'>
              <PinterestLineIcon size={28} />
            </a>
            <a target='_blank' href='https://www.facebook.com/thecreatorsdesigns'>
              <FacebookCircleLineIcon size={28} />
            </a>
          </SocialMediaIcons>
          <Copyright>
            <p>© {(new Date()).getFullYear()} The Creators’ Designs Studio S.R.L.</p>
            <br />
            <em>© All artwork and conceptual work is owned by The Creators’ Designs Studio under copyright. No work, imagery, or content on this site should be replicated or used in any way, personally, commercially, or otherwise, without express permission. All work, licensed or sold, is owned by The Creators’ Designs Studio.</em>
          </Copyright>
          <br />
          <br />
          <img src='/assets/images/favicon.png' width={60} />
        </Content>
      </Container>
    </Wrapper>
  )
}
