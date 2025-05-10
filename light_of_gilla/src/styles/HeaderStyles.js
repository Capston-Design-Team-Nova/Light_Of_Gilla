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
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 480px) {
    justify-content: center;
    gap: 10px; /* 간격 균일하게 */
  }
`;

export const NavRight = styled.nav`
  width: 98%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 480px) {
    justify-content: center;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;

    button, a {
      margin: 0;
    }
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #ffc86a;
  color: black;
  font-family: "OurFont1";
  font-weight: bold;
  font-size: 1.3vw;
  cursor: pointer;
  border: none;
  width: auto;
  height: auto;
  /* ✅ margin 제거 */
`;

export const LogoutButton = styled(Button)`
  /* ✅ Button 스타일 상속받으므로 따로 margin 필요 없음 */
`;

export const ImageButton1 = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2px;
  position: relative;

  img {
    width: 95px;
    height: 55px;
  }

  @media screen and (max-width: 480px) {
    margin: 0;
    img {
      margin-left: 10px;
      width: 36px;
      height: 36px;
    }
  }
`;

export const ImageButton2 = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2px;
  position: relative;
  /* ✅ margin-left 제거 */

  img {
    width: 45px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    margin: 0;
    img {
      width: 36px;
      height: 36px;
    }
  }
`;
