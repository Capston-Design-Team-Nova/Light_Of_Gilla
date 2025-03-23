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
  width: 70vw;
  text-align: center;
  font-size: 1vw;
  color: #black;
  font-family: 'OurFont2';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;

export const FeaturesSection = styled.section`
background: #f4f4f4;
padding: 50px 20px;
text-align: center;
`;

export const FeaturesContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;
margin-top: 20px;
`;

export const Feature = styled.div`
background: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
flex: 1;
max-width: 300px;
`;

export const Footer = styled.footer`
background: #333;
color: white;
text-align: center;
padding: 20px;
margin-top: 50px;
`;
