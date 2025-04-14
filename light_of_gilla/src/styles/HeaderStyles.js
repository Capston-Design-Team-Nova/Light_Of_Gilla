import styled from "styled-components";

const mobile = "@media screen and (max-width: 480px)";

export const PageHeader = styled.header`
  width: 100%;
  background-color: #ffc86a;
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  position: fixed; /* 상단에 고정 */
  top: 0; /* 화면 상단에 위치 */
  left: 0; /* 화면 왼쪽에 위치 */
  z-index: 1000;

  ${mobile} {
    top: auto;
    bottom: 0; /* ✅ 모바일에서 하단 고정 */
    height: 42px;
  }
`;

export const Nav = styled.nav`
  width: 99%;
  display: flex; /* Flexbox 활성화 */
  justify-content: flex-end; /*우측 정렬*/
  align-items: center; /* 세로 방향으로 중앙 정렬 */
`;

export const NavRight = styled.nav`
  width: 96%;
  display: flex; /* Flexbox 활성화 */
  justify-content: flex-end; /* 우측 정렬 */
  align-items: center; /* 세로 방향으로 중앙 정렬 */

  /* ✅ 모바일에서만 간격 일정하게 */
  @media screen and (max-width: 480px) {
    gap: 25px; // 👉 원하는 만큼 조절 (예: 8px, 16px 등)
  }
`;

export const Button = styled.button`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #ffc86a;
  color: black;
  font-family: "OurFont1";
  font-weight: bold;
  font-size: 1.3vw;
  cursor: pointer;
  border: none;

  @media screen and (max-width: 480px) {
    padding: 8px 12px;
    font-size: 10px;
    min-width: 90px;
  }
`;

export const ImageButton1 = styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:2px; 

  img {
    width: 95px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 55px; /* 비율에 맞게 높이 자동 조정 */
    
  }

  @media screen and (max-width: 480px) {
    img {
      margin-left:5px;
      width: 36px;
      height: 36px;  /* ✅ 모바일에서는 살짝 줄임 */
    }
`;

export const ImageButton2 = styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:2px; 

  img {
    width: 45px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 40px; /* 비율에 맞게 높이 자동 조정 */
    
  }

  @media screen and (max-width: 480px) {
    img {
      margin-right:5px;
      width: 36px;
      height: 36px;  /* ✅ 모바일에서는 살짝 줄임 */
    }
`;
