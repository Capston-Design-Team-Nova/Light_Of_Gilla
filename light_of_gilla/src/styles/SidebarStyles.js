import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;
  top: 63px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: calc(100% - 30px);
  background-color: #FAF2E8;
  transition: left 0.3s ease-in-out;
  padding-top: 60px;
  z-index: 999;

  @media screen and (max-width: 480px) {
  top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 80%;
    height: 100%;
    
  }

  @media screen and (min-width: 481px) {
    left: 0 !important; /* 강제 고정 */
  }
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
    background-color: ${({ isActive }) => (isActive ? "#FFE2B1" : "#FAF2E8")};
    
    font-family: Ourfont4;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border: none;
    width: 160px;
    text-align: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color:rgb(254, 232, 190);
    }



     @media screen and (max-width: 480px) {
        width: 100%;
        font-size: 15px;
    }
`;
//background-color: #FAF2E8;/* #ffedcb;*/
export const BackButton = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  
    @media screen and (max-width: 480px) {
        top: 25px;
        left: 25px;
        width: 24px;
        height: 24px;
    }
`;