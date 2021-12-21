import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  background: #fff;
  box-shadow: 0 17px 13px 0 rgb(25 44 75 / 2%);
  z-index: 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    background: url(/assets/images/bg.png);
    width: 476px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: -1;
    opacity: 0.5;
    filter: blur(1px);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const BannerLeft = styled.div`
 padding: 80px 0;
 -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
 -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
   -o-animation: fadein 1s; /* Opera < 12.1 */
      animation: fadein 1s;
`;

export const BannerRight = styled.div`
  display: grid;
  align-items: center;
  justify-content: flex-end;
  
  img {
    @media (max-width: 767px) {
      display: none;
    }
    max-height: 500px;
    object-fit: contain;

    -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 3s; /* Firefox < 16 */
        -ms-animation: fadein 3s; /* Internet Explorer */
         -o-animation: fadein 3s; /* Opera < 12.1 */
            animation: fadein 3s;
  }
`;

export const Title = styled.h1`
  font-size: calc(32px + 1.46484vw);
  line-height: 1.2;
  letter-spacing: -.02em;
`;