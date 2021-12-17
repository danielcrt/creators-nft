import styled from "styled-components";

export const Wrapper = styled.div`
  background: #eee;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContactBackground = styled.div`
-webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
-moz-animation: fadein 1s; /* Firefox < 16 */
 -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
     animation: fadein 1s;
`;

export const ContactFormContainer = styled.div`
  max-width: 767px;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

export const Content = styled.div`
  padding: 80px 10px;
`;

export const SuccessMessage = styled.p`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.success};
  svg {
    color: ${props => props.theme.colors.success};
  }
`;