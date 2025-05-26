import styled from "styled-components";

const mobile = "@media screen and (max-width: 480px)";

export const PageHeader = styled.header`
  width: 100%;
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  position: fixed; /* 상단에 고정 */
  top: 0; /* 화면 상단에 위치 */
  left: 0; /* 화면 왼쪽에 위치 */
  z-index: 1000;
  overflow: visible;
  padding-bottom: 2px; /* 아래쪽 패딩 추가 */
  padding-top: 2px; /* 위쪽 패딩 추가 */
  padding-left: 0; /* 왼쪽 패딩 추가 */
  
  backdrop-filter: blur(10px);
  background: linear-gradient(to right, #FFDA77, #FFBC3B);
  
  transition: top 0.4s ease, opacity 0.4s ease, box-shadow 0.3s ease;

  ${mobile} {
    top: unset; /* 모바일에서는 상단 고정 해제 */
    left: 0; /* 모바일에서도 왼쪽 고정 */
    right: 0; /* 모바일에서도 오른쪽 고정 */
    bottom: 0; /* ✅ 모바일에서 하단 고정 */
    position: fixed;
    width: 100%;
    justify-content: center; /* 모바일에서는 중앙 정렬 */
    height: 42px;
  }
`;

export const Nav = styled.nav`
  width: 99%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 0;

  @media screen and (max-width: 480px) {
    justify-content: center;
    gap: 10px; /* 간격 균일하게 */
  }
`;

export const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  margin-bottom: 3px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  img {
    width: 100px;

    @media screen and (max-width: 768px) {
      width: 70px;
      height: auto;
    }
  }

  &:hover {
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: scale(1.05);
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
    gap: 4px;
    flex-wrap: nowrap; // 필요 시 wrap으로 바꿔도 돼
    overflow-x: visible;     
  }
`;

export const TextLogo = styled.div`
  font-family: 'GmarketSansBold', sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #FF9900;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 16px;
  cursor: pointer;

  span {
    font-size: 1.8rem; // 아이콘 크기 조절
  }

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
    span {
      font-size: 1.4rem;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px 16px;
  font-family: 'GmarketSansTTFMedium';
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  margin-right: 20px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 170, 0, 0.4);
  letter-spacing: 0.5px;
  
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  // ✅ 스크롤 상태에 따라 동적 스타일 적용
  background: #FFD95A;
  color: #222;

  // ✅ blur 효과는 스크롤 시에만 적용
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(8px)' : 'none')};

  // ✅ hover 효과도 스크롤 여부 반영
  &:hover {
    background: ${({ $scrolled }) =>
      $scrolled ? 'rgba(255, 255, 255, 0.3)' : '#ffa726'};
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    
    color: white;
  }

  @media screen and (max-width: 480px) {
    padding: 4px 6px;
    font-size: 10px;
    min-width: 60px;
    height: 36px;
    border-radius: 6px;
    letter-spacing: 0.2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    background: #FFD95A;
    color: #222;
    border: 1px solid rgba(255, 170, 0, 0.4);
    
    margin: 0 2px;
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
    margin-left: 5px;
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
  margin-left: 20px;

  img {
    width: 45px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: auto; /* 비율에 맞게 높이 자동 조정 */
    
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
  top: calc(100% + 10px);  /* 버튼 아래 여백 확보 */
  right: 0;
  width: 150px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansTTFMedium';

  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${props => props.$open ? "translateY(0)" : "translateY(-10px)"};
  opacity: ${props => props.$open ? 1 : 0};
  visibility: ${props => props.$open ? "visible" : "hidden"};

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 12px;
    width: 12px;
    height: 12px;
    background-color: #fff;
    transform: rotate(45deg);
    box-shadow: -1px -1px 1px rgba(0,0,0,0.05);
  }

  @media screen and (max-width: 480px) {
    top: auto;
    bottom: calc(100% + 10px);
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(10px)')};

    &::before {
      top: auto;
      bottom: -6px;
      transform: rotate(45deg);
    }
  }
`;


export const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 18px;
  background-color: ${(props) =>
    props.$danger ? "#fff1f0" : "white"};
  color: ${(props) =>
    props.$danger ? "#d32f2f" : "#333"};
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: ${(props) =>
      props.$danger ? "#ffe6e6" : "#f5f5f5"};
  }
`;
