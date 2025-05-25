import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100%;
  background-color: #FAF2E8;
  transition: left 0.3s ease-in-out;
  z-index: 999;
  padding-top: 6rem;
 box-shadow: 2px 0 4px rgba(124, 124, 124, 0.3);   /* 오른쪽 */

  @media screen and (max-width: 480px) {
  top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 80%;
    height: 100%;
     z-index: 999;
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
    background: ${({ isActive }) =>
      isActive
          ? "linear-gradient(135deg,#FFD59E, #FFC87B, #FFD59E)" //현재 위치
          : "linear-gradient(135deg,#FCE7D0, #F9DDC1, #FCE7D0)"}; /*다른 위치*/

    background-size: 200% 200%;
    animation: ${({ isActive }) => (isActive ? "shimmer 3s ease-in-out infinite" : "none")};

    font-family: 'OurFont10';
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
    border: none;
    border-radius:7px;
    width: 225px;
    text-align: center;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background: linear-gradient(135deg, #FFD59E, #FFC87B, #FFD59E);
        background-size: 200% 200%;
        animation: shimmer 3s ease-in-out infinite;
    }

     @media screen and (max-width: 480px) {
        width: 225px;
        font-size: 15px;
    }
        @keyframes shimmer {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
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