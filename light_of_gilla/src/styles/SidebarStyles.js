import styled from "styled-components";

export const SidebarContainer = styled.div`
    position: absolute;
    top: 63px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
    width: 250px;
    height: 100%;
    background-color: #FAF2E8;
    transition: left 0.3s ease-in-out;
    padding-top: 60px;
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
    background-color: #FAF2E8;
    font-family: Ourfont4;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border: none;
    width: 160px;
    text-align: center;
    transition: background-color 0.2s ease-in-out;
`;