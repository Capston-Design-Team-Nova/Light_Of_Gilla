import styled from 'styled-components';
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
min-height: 800px;
`;

export const FeaturesContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;
margin-top: 20px;
flex-flow: column;
text-align: center;
min-height: 800px;
`;
export const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 630px;
    margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const FeatureImage = styled.img`
  width: 100%;
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
  font-size: 35px;
  color: #000000E3;
  font-family: 'OurFont4';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const P3 = styled.h1`
  
  text-align: center;
  font-size: 35px;
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
