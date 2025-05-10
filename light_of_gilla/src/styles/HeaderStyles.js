// HeaderStyles.js
import styled from "styled-components";

const mobile = "@media screen and (max-width: 480px)";

export const PageHeader = styled.header`
  width: 100%;
  background-color: #ffc86a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;

  ${mobile} {
    top: auto;
    bottom: 0;
    height: 42px;
  }
`;

export const Nav = styled.nav`
  width: 99%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;

  ${mobile} {
    width: 100%;
    justify-content: center; /* ✅ 모바일에서 가운데 정렬 */
    gap: 1rem;               /* ✅ 버튼 간 일정한 간격 */
  }
`;

export const NavRight = styled.nav`
  width: 98%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;

  ${mobile} {
    width: 100%;
    justify-content: center; /* ✅ 모바일에서 가운데 정렬 */
    gap: 1rem;               /* ✅ 버튼 간 일정한 간격 */
    padding: 0;
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
  box-sizing: border-box;

  ${mobile} {
    font-size: 0.7rem;
    padding: 6px;
  }
`;

export const LogoutButton = styled(Button)`
  /* Button 스타일 상속 */
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

  ${mobile} {
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

  img {
    width: 45px;
    height: 40px;
  }

  ${mobile} {
    margin-right: 3px;
    img {
      width: 36px;
      height: 36px;
    }
  }
`;
