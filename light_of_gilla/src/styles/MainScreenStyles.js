import styled,{ keyframes } from 'styled-components';
import backgroundImage from '../assets/images/image1.png';


export const Center = styled.div`
  width: 100%;
  height: 87vh; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-image: url(${backgroundImage});
  background-size: cover; /* 이미지가 영역을 채우도록 설정 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 80px; /* PageHeader의 높이에 맞는 여백 추가 */
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;


export const P = styled.h1`
  
  text-align: center;
  font-size: 40px;
  color: #black;
  font-family: 'OurFont4';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const FeaturesSection = styled.section`
background: #f4f4f4;
padding: 50px 20px;
text-align: center;
display: flex;
flex-flow: column;
justify-content: center;
align-items:center;

`;

export const FeaturesContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;

flex-flow: column;
text-align: center;

`;
const slideInFromTop = keyframes`
  0% {
  opacity: 0;
    transform: translateY(-50px);
  }
  100% {
  opacity: 1;
    transform: translateY(0);
  }
`;

export const FeatureBox = styled.div`

 opacity: 0; /* 처음에 숨겨놓고 */
  animation: ${slideInFromTop} 5s ease-out forwards;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 510px;
 
  max-height: 100vh; 
`;

export const FeatureBox2 = styled.div`
  opacity: 0; /* 처음에 숨겨놓고 */
  animation: ${slideInFromTop} 5s ease-out forwards;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 510px;
  margin-top: 20px; /* 컨테이너 상단 여백 */
  max-height: 100vh; 
`;

export const FeatureImage = styled.img`

  width: 80%;
  height: auto;
  border-radius: 10px;
`;


export const P4 = styled.h1`
  text-align: center;
  font-size: 20px;
  color: #black;
  font-family: 'OurFont2';
  vertical-align: bottom;
`;

export const LastSection =styled.div`
background:#white;
padding: 50px 20px;
display: flex;
flex-flow: column;
text-align: center;
justify-content: center;

`;

export const P2 = styled.h1`
  
  text-align: center;
  font-size: 33px;
  color:rgba(48, 47, 47, 0.9);
  font-family: 'OurFont4';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const P3 = styled.h1`
  
  text-align: center;
  font-size: 33px;
  color: #E69100;
  font-family: 'OurFont4';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const Footer = styled.footer`
background: #333;
color: white;
text-align: center;
padding: 20px;
margin-top: 50px;
`;
