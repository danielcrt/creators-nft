import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Cormorant Garamond',Georgia,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: ${props => props.theme.colors.text};
}

textarea, input, button {
  font-family: 'Cormorant Garamond',Georgia, sans-serif;
  font-size: 18px;
}

a {
  outline: none;
  color: ${props => props.theme.colors.primaryAccent};
  text-decoration: none;
  cursor: pointer;
  transition: .25s cubic-bezier(.4,0,.2,1);
  text-decoration: none!important;
}

* {
  box-sizing: border-box;
}

li {
  font-size: 18px;
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Cormorant Garamond',Georgia,"Times New Roman",serif;
}

p {
  font-family: 'Cormorant Garamond',Georgia,"Times New Roman",serif;
  font-size: 18px;
  line-height: 1.6rem;
  margin: 0;
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;