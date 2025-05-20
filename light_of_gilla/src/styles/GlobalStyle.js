import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import font1 from '../assets/fonts/DavidLibre-Bold.ttf';
import font2 from '../assets/fonts/DavidLibre-Medium.ttf';
import font3 from '../assets/fonts/DavidLibre-Regular.ttf';
import font4 from '../assets/fonts/Fustat-VariableFont_wght.ttf';
import font5 from '../assets/fonts/Roboto-VariableFont_wdth,wght.ttf';
import font6 from '../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf';
import font7 from '../assets/fonts/NanumGothicBold.ttf';
import font8 from '../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf';
import font9 from '../assets/fonts/GmarketSansTTFBold.ttf';
import font10 from '../assets/fonts/GmarketSansTTFMedium.ttf';
import font11 from '../assets/fonts/SpoqaHanSansNeo-Bold.ttf';
import font12 from '../assets/fonts/SpoqaHanSansNeo-Regular.ttf';
import font13 from '../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf';

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

  @font-face {
    font-family: 'OurFont7';
    src: url(${font7}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'OurFont8';
    src: url(${font8}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

    @font-face {
    font-family: 'OurFont9';
    src: url(${font9}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
      @font-face {
    font-family: 'OurFont10';
    src: url(${font10}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
      @font-face {
    font-family: 'OurFont11';
    src: url(${font11}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
      @font-face {
    font-family: 'OurFont12';
    src: url(${font12}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
      @font-face {
    font-family: 'OurFont13';
    src: url(${font13}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: Font1;
  }
  .body-MainScreen {
    overflow-y: scroll; /* 세로 방향으로 스크롤 가능하도록 설정 */
    ::-webkit-scrollbar {
      display: none; /* 웹킷 기반 브라우저에서 스크롤바 숨기기 */
    }
  }
`;
// export const DIV = styled.div`

//   background-color: #ffffff;



