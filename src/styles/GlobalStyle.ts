import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme?.background.main};
    color: ${({ theme }) => theme?.color};
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 16px;

    @media (min-width: 768px) {
      padding: 0 32px;
    }
  }

  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
