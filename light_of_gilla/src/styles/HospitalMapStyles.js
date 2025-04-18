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
  top: 240px;
  left: 350px; /* 사이드바(300px) + 여백(20px) 만큼 이동 */
  width: calc(100% - 370px); /* 전체 너비에서 사이드바 + 여백 제외 */
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;

  ${mobile} {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`;

/* 사이드바 */
export const Sidebar = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 300px;
  height: 110%;
  background: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  z-index: 10;

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
    position:fixed;
    width: 90%;
    height: auto;
    bottom: 42px; /* 헤더 높이만큼 위로 */
    top: 60%;
    left: 0;
    border-right: none;
    border-top: 1px solid #ddd;
    font-size: 14px;
  }
`;

export const SearchContainer = styled.div`
  position: absolute;
  top: 90px;
  left: calc(360px + 5%);
  width: calc(90% - 360px);
  padding: 15px;
  border-radius: 8px;
  z-index: 10;
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
      width: 30px;
      height: 30px;
    }
  }
`;


export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const CategoryButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  right: 0px;

  .scroll-btn {
    background: white;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #eee;
    }
  }

  .category-scroll {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    flex: 1;
    gap: 8px;
    margin: 0 8px;
  }

  .category-scroll::-webkit-scrollbar {
    display: none;
  }

  .category-scroll button {
    flex: 0 0 auto;
    padding: 5px 20px;
    font-size: 20px;
    border: none;
    border-radius: 15px;
    background: #ff6b6b;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      background: #ff4757;
    }
  }

  ${mobile} {
    .scroll-btn {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
  }
`;
