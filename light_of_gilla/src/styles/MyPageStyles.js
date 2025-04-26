import styled from "styled-components";

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';

export const Center = styled.div`
  width: 100%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 90px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color: white;/*#ffece3;*/

  ${mobile} { 
    padding-bottom: 50px;
  }
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 36px;
`;

export const ProfileImage = styled.image`
    
    width: 200px;
    height: 196px;

`;

export const UserEmail = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const Birthday = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const UserId = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const UserName = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const NewPassword = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const CheckNewPassword = styled.h4`
    font-family: Ourfont4;
    font-weight: semi bold;
    font-size: 28px;
`;

export const SaveButton = styled.button`
  padding: 2px;
  width: 94px;
  height: 49px;
  background-color: #white;
  color: black;
  font-family: 'OurFont2';
  font-size: 30px;
  cursor: pointer;
  border: none;
  border-radius: 8px;

    ${mobile} {
    
    width: 95%;
  }
`;