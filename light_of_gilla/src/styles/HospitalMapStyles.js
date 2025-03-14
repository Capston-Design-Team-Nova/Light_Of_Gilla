import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start;
  position: relative;
`;

export const MapContainer = styled.div`
  position: absolute;
  top: 240px;
  left: 350px; /* 사이드바(300px) + 여백(20px) 만큼 이동 */
  width: calc(100% - 370px); /* 전체 너비에서 사이드바 + 여백 제외 */
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Sidebar = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 90px; /* 검색창과 같은 높이 */
  left: 0; /* 화면 왼쪽에 위치 */
  width: 300px;
  height: 110%;
  background: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  z-index: 10; /* 지도 위에 표시 */

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
`;

export const SearchContainer = styled.div`
  position: absolute; /* 고정 위치 설정 */
  top: 90px; /* 헤더 아래에 위치 */
  left: 60%;
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 74%;
  background: white;
  padding: 15px;
  border-radius: 8px;
  z-index: 10; /* 지도 위에 표시 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchBox = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  button {
    padding: 8px 12px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }
`;

/* ✅ SearchInput 추가 */
export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

/* ✅ CategoryButtons 추가 */
export const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;

  button {
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
`;
