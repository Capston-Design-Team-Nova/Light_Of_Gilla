import styled,{ keyframes } from 'styled-components';
import backgroundImage from '../assets/images/background8.png';
import imagemobile from '../assets/images/mobileback.png'
import { Link } from 'react-router-dom';
// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
`;

export const Center = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center 20%;
  padding-top: 100px;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.3));
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px; /* 부드러운 영역 높이 */
    background: linear-gradient(to bottom, transparent, #f9f9f9); /* ✅ 자연스럽게 흰 배경으로 전환 */
    z-index: 2;
  }
  .hero-text-wrapper {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-10vh); /* ✅ 위로 5%만 이동 */
  }

  > * {
    color: white;
  }

  ${mobile} {
    padding-bottom: 80px;
    background-image: url(${imagemobile});
    background-size: cover;
    background-position: center;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  
  padding-bottom: 100px;  /* ✅ 여백 추가 */

  ${mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export const Card = styled.div`
  flex: 1 1 22%;             // 데스크탑에서 4개 정렬을 위한 너비
  max-width: 300px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  }

  @media screen and (max-width: 1024px) {
    flex: 1 1 45%;          // 태블릿: 2개씩
    max-width: 48%;
  }

  @media screen and (max-width: 600px) {
    flex: 1 1 100%;         // 모바일: 1개씩
    max-width: 100%;
  }
`;

export const CardImage = styled.img`
  width: 70%;       // ✅ 카드의 가로폭 기준으로 70% 정도 차지
  height: auto;
  margin: 0 auto 1.2rem auto;
  @media screen and (max-width: 768px) {
    width: 60%;     // 모바일에서는 조금 줄여서 안정감 있게
  }
`;

export const CardTitle = styled.h3`

  font-family: 'SpoqaHanSansMedium', sans-serif;
  font-size: 1.6rem; // 기존보다 크게
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-align: center;
`;

export const CardText = styled.p`

  line-height: 1.5;
  min-height: 5em;
  font-family: 'SpoqaHanSansMedium', sans-serif;
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-bottom: 1.5rem;
`;


export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Intro = styled.div`
  background: linear-gradient(to bottom, #f0f4fa 0%, #ffffff 100%);
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  min-height: 70vh;

  ${mobile} {
    padding: 40px 10px;
    min-height: auto;
  }
`;

export const QnAButton = styled.button`
  background: linear-gradient(to right, #a18cd1, #fbc2eb);
  color: white;
  font-family: 'GmarketSansTTFMedium', sans-serif;
  font-size: 1.4rem;
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #a18cd1, #fad0c4);
    transform: scale(1.05);
  }
`;

export const P = styled.h2`
  font-family: 'SpoqaHanSansMedium', sans-serif;
  font-size: 2.4rem;
  font-weight: bold;
  color: #222;
  text-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  ${mobile} {
    font-size: 1.8rem;
  }
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


export const FeatureBox1 = styled.div`


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

  ${mobile} {
    width: 90%;
    padding: 10px;
  }
`;

export const FeatureBox2 = styled.div`
 
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

  ${mobile} {
    width: 90%;
    padding: 10px;
  }
`;

export const FeatureImage = styled.img`

  width: 80%;
  height: auto;
  border-radius: 10px;

  ${mobile} {
    width: 100%;
  }
`;


export const P4 = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  font-family: 'SpoqaHanSansMedium';
  margin: 0;
  margin-bottom: 16px;

  strong {
    color: #f57c00; /* 오렌지 포인트 */
    font-weight: bold;
  }

  ${mobile} {
    font-size: 1rem;
    padding: 0 12px;
  }
`;

export const LastSection =styled.div`
background:#white;
padding: 50px 20px;
display: flex;
flex-flow: column;
text-align: center;
justify-content: center;


${mobile} {
  padding: 30px 10px;
  height: 75%;
}
`;

export const P2 = styled.h1`
  
  text-align: center;
  font-size: 33px;
  color:rgba(48, 47, 47, 0.9);
  font-family: 'OurFont4';
  margin-top: 30px; /* 컨테이너 상단 여백 */

  ${mobile} {
    font-size: 20px;
  }
`;


export const P5 = styled.p`
  font-family: 'SpoqaHanSansMedium', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c2c2c;
  text-shadow: 0 1px 2px rgba(0,0,0,0.08);

  ${mobile} {
    font-size: 1.1rem;
  }
`;

export const IconWrapper = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  animation: ${bounce} 2.5s infinite ease-in-out;
`;

export const P3 = styled.h1`
  font-family: 'SpoqaHanSansMedium', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px; /* ✅ 버튼과 간격 좁히기 */
  color: #ffcc66; /* ✅ 배경 대비 더 밝은 톤 */
  font-weight: 500;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.5));
  transition: all 0.3s ease-in-out;

  ${mobile} {
    font-size: 20px;
  }
`;

export const Footer = styled.footer`
background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
color: #eee;
font-size: 0.9rem;
line-height: 1.6;
text-align: center;
padding: 30px 10px;
font-family: 'Noto Sans KR', sans-serif;

${mobile} {
  font-size: 15px;
  padding-bottom: 50px;
}
`;// MainScreenStyles.js에 추가

export const PrimaryButton = styled.button`
  background: linear-gradient(to right, #FBB034, #FF4E00);
  color: white;
  font-family: 'GmarketSansTTFMedium', sans-serif;
  font-size: 1.4rem;
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e0a800, #d35400);
    transform: scale(1.05);
  }

  ${mobile} {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;

export const SecondaryButton = styled.button`
  background: linear-gradient(to right, #00C9FF, #92FE9D);
  color: white;
  font-family: 'GmarketSansTTFMedium', sans-serif;
  font-size: 1.4rem;
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #00B4DB, #0083B0);
    transform: scale(1.05);
  }

  ${mobile} {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;

export const TertiaryButton = styled.button`
  background: linear-gradient(to right, #A770EF, #FDB99B);
  color: white;
  font-family: 'GmarketSansTTFMedium', sans-serif;
  font-size: 1.4rem;
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #C471F5, #FA71CD);
    transform: scale(1.05);
  }

  ${mobile} {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;

export const LinkButton = styled(Link)`
  margin-top: 20px;
  padding: 14px 28px;
  
  background: ${({ variant }) =>
    variant === 'primary' ? 'linear-gradient(to right, #FBB034, #FF4E00)' :
    variant === 'secondary' ? 'linear-gradient(to right, #00C9FF, #92FE9D)' :
    'linear-gradient(to right, #A770EF, #FDB99B)'};

  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.4rem;
  border-radius: 16px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);  /* ✅ 입체감 */
  transition: all 0.3s ease;

  &:hover {
  background: ${({ variant }) =>
    variant === 'primary' ? 'linear-gradient(135deg, #e0a800, #d35400)' :
    variant === 'secondary' ? 'linear-gradient(135deg, #00B4DB, #0083B0)' :
    'linear-gradient(135deg, #C471F5, #FA71CD)'};
  transform: scale(1.05);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
  }

  ${mobile} {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;


export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;  /* ✅ 기존보다 줄이기 (기존에 20px~30px 있었다면) */

  button, a {
    white-space: nowrap;
  }
`;

export const HeroPrimaryButton = styled.button`
  font-family: 'GmarketSansTTFMedium', sans-serif;  /* ✅ 지마켓 폰트 */
  font-size: 1.2rem;
  font-weight: bold;
  padding: 14px 28px;
  background: linear-gradient(to right, #FFB84D, #FF6B00); /* 주황 그라데이션 */
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  text-align: center;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.95rem;
    padding: 10px 18px;
  }
`;

export const OverlayTitle = styled.h1`
  font-family: 'ShamsonSignature', cursive;
  font-size: 10vw; /* 기존보다 약간 더 큼 */
  margin-bottom: 50px; /* ✅ 간격 살짝 띄우기 */
  white-space: nowrap;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

  animation: fadeInDown 1s ease;
  filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.5));
  transition: all 0.3s ease-in-out;

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media screen and (max-width: 480px) {
    font-size: 16vw;
    top: 60px;
  }
`;