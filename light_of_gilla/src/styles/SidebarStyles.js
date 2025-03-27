import styled from "styled-components";

export const SidebarContainer = styled.div`
    position: absolute;
    top: 63px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
    width: 250px;
    height: calc(100% - 30px);  // ✅ 헤더 높이를 뺀 실제 높이;
    background-color: #FAF2E8; /*#ffedcb;*/
    transition: left 0.3s ease-in-out;
    padding-top: 60px;
    z-index:999; /*추가: 햄버거 버튼 위로 올라오게*/
    
`;

export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SidebarButton = styled.button`
    padding: 15px;
    margin: 10px 0;
    color: black;
    background-color: #FAF2E8;/* #ffedcb;*/
    font-family: Ourfont4;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border: none;
    width: 160px;
    text-align: center;
    transition: background-color 0.2s ease-in-out;
`;

export const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;