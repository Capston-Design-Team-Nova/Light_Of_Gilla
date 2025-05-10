import styled from "styled-components";

const mobile = "@media screen and (max-width: 480px)";

export const Main = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start;
  position: relative;
`;

/* 지도 컨테이너*/
export const MapContainer = styled.div`
  position: absolute;
  top: 290px;
  left: 350px; /* 사이드바(300px) + 여백(20px) 만큼 이동 */
  width: calc(100% - 370px); /* 전체 너비에서 사이드바 + 여백 제외 */
  height: 95%;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 3;

  ${mobile} {
    top: 0px;
    left: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
    z-index: 3;
  }
`;

/* 사이드바 */
export const Sidebar = styled.div`
  position: absolute;
  top: 290px;
  left: 0;
  width: 300px;
  height: 91%;
  background: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  z-index: 3;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  div {
    margin-bottom: 10px;
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 5px;

    &:hover {
      background: rgb(226, 226, 226);
    }
  }

  ${mobile} {
    position: fixed;
    width: 90%;
    height: auto;
    bottom: 42px; /* 헤더 높이만큼 위로 */
    top: 60%;
    left: 0;
    border-right: none;
    border-top: 1px solid #ddd;
    font-size: 14px;
    z-index: 4;
  }
`;

export const SearchContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 10px;
  width: calc(100% - 60px);
  padding: 15px;
  border-radius: 8px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile} {
    top: 10px;
    left: 10px;
    right: 5px;
    width: auto;
    padding: 10px;
    box-sizing: border-box;
    z-index: 4;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  background: rgba(0, 0, 0, 0);

  img {
    padding: 5px 1px;
    width: 50px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    &:hover {
      background: rgb(226, 226, 226);
    }
  }

  ${mobile} {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const HospitalItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgb(226, 226, 226);
  }

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 14px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px;
  ${mobile} {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
`;

export const TabSwitcher = styled.div`
  display: flex;
  justify-content: space-around;
  background: #eee;
  border-radius: 10px;
  margin: 10px;
  button {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const GpsButton = styled.button`
  position: absolute;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }

  ${mobile} {
    position: fixed;
    left: 16px;
    z-index: 1000;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 32px;
  flex: 1;

  ${mobile} {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`;

export const CategoryModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const CategoryModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-height: 80vh;
  overflow-y: auto;

  ${mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const CategoryItem = styled.div`
  flex: 1 1 120px;
  max-width: 160px;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  img {
    width: 64px;
    height: 64px;
    margin-bottom: 8px;
    transition: transform 0.2s ease-in-out;
  }

  span {
    font-size: 14px;
    text-align: center;
    color: #333;
  }

  &:hover {
    background: #f2f2f2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    img {
      transform: scale(1.08);
    }
  }

  ${mobile} {
    max-width: 60px;
    min-width: 50px; // 기존보다 더 줄임
    padding: 6px;

    img {
      width: 28px;
      height: 28px;
    }

    span {
      font-size: 11px;
    }
  }
`;

export const CategoryButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 30px 0 10px;
  gap: 40px;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto; /* ✅ 데스크탑에서도 스크롤 가능하게 */
  -webkit-overflow-scrolling: touch;

  ${mobile} {
    padding: 0px 8px;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #ffffff;
    border-radius: 12px;
  }
`;

export const CategoryAllButton = styled(CategoryItem)`
  flex: 0 0 auto; /* ✅ 줄어들지 않게 설정 */
  min-width: fit-content; /* ✅ 너무 작아지지 않게 */
  max-width: 100px;
  padding: 12px;

  span {
    color: #666;
    font-size: 13px;
  }

  ${mobile} {
    min-width: 60px;
    max-width: 60px;
    padding: 6px;

    span {
      font-size: 11px;
    }
  }
`;
