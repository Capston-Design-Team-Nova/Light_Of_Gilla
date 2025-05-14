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
  overflow: visible;

  ${mobile} {
    top: auto;
    bottom: 0; /* ✅ 모바일에서 하단 고정 */
    height: 42px;
  }
`;

export const Nav = styled.nav`
  width: 99%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 480px) {
    justify-content: center;
    gap: 10px; /* 간격 균일하게 */
  }
`;


export const NavRight = styled.nav`
  width: 96%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 480px) {
    justify-content: center;
    gap: 10px;
    flex-wrap: nowrap; // 필요 시 wrap으로 바꿔도 돼
    overflow-x: auto;   // 버튼이 많다면 좌우 스크롤 허용    
  }
`;

export const Button = styled.button`
  padding: 12px;
  width: 100%;
  height: 100%;
  background-color:#ffc86a;
  color: black;
  font-family: "OurFont7";
  font-weight: bold;
  font-size: 1.3vw;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 20px;

  &:hover {
    background-color:#FFB536;
  }

  @media screen and (max-width: 480px) {
  padding: 4px 6px;
  font-size: 10px;
  min-width: 70px;
  margin: 0 4px;
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
    margin-left: 10px;
    width: 36px;
    height: 36px;
  }
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
   z-index: 9998; /* ✅ 다른 요소 위에 위치하도록 명확히 지정 */
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
 z-index: 9999; /* ✅ 다른 요소 위에 위치하도록 명확히 지정 */

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
    ${DropdownWrapper}:hover & {
      transform: translateY(0);
    }
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
