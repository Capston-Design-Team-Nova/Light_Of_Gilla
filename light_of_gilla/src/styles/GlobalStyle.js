import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import font1 from '../assets/fonts/DavidLibre-Bold.ttf';
import font2 from '../assets/fonts/DavidLibre-Medium.ttf';
import font3 from '../assets/fonts/DavidLibre-Regular.ttf';
import font4 from '../assets/fonts/Fustat-VariableFont_wght.ttf';
import font5 from '../assets/fonts/Roboto-VariableFont_wdth,wght.ttf';
import font6 from '../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf';

export const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
    font-family: 'OurFont1';
    src: url(${font1}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }


@font-face {
    font-family: 'OurFont2';
    src: url(${font2}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }


@font-face {
    font-family: 'OurFont3';
    src: url(${font3}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

@font-face {
    font-family: 'OurFont4';
    src: url(${font4}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

@font-face {
    font-family: 'OurFont5';
    src: url(${font5}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

@font-face {
    font-family: 'OurFont6';
    src: url(${font6}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }


  body {
    font-family: Font1;
  }
  
// export const DIV = styled.div`

//   background-color: #ffffff;

// `;
