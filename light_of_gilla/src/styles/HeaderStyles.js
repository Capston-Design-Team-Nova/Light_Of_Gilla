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
  gap: 10px;

  /* ✅ 모바일에서만 간격 일정하게 */
  @media screen and (max-width: 480px) {
    gap: 3px; // 👉 원하는 만큼 조절 (예: 8px, 16px 등)
  }
`;

export const Button = styled.button`
  padding: 12px;
  width: 100%;
  height: 100%;
  background-color: #ffc86a;
  color: black;
  font-family: "OurFont1";
  font-weight: bold;
  font-size: 1.3vw;
  cursor: pointer;
  border: none;
  margin-left: 10px;
  margin-right: 20px;

  @media screen and (max-width: 480px) {
    padding: 8px 5px;
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
  position: relative;
  

  img {
    width: 95px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 55px; /* 비율에 맞게 높이 자동 조정 */
    
  }

  @media screen and (max-width: 480px) {
    img {
      margin-left:35px;
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
  position: relative;
  margin-left: 30px;

  img {
    width: 45px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 40px; /* 비율에 맞게 높이 자동 조정 */
    
  }

  @media screen and (max-width: 480px) {
    img {
      
      width: 36px;
      height: 36px;  /* ✅ 모바일에서는 살짝 줄임 */
    }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 85px;
  background-color: #444;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  ${DropdownWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* ✅ 모바일에서는 위로 열리게 수정 */
  @media screen and (max-width: 480px) {
    top: auto;
    bottom: 100%;              // 버튼 위쪽에 위치
    transform: translateY(10px); // 아래서 위로 올라오게
    right: 0;
    left: auto;
  }
`;


export const DropdownItem = styled.div`
  padding: 5px 10px 5px;
  color: white;
  font-size: 13.5px;
  text-align: center;
  cursor: pointer;
  border-bottom: none;

  &:hover {
    background-color: #555;
  }
`;
