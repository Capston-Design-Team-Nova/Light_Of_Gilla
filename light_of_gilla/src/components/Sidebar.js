import React from 'react';
import { SidebarContainer, SidebarContent, SidebarButton,BackButton } from '../styles/SidebarStyles';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <SidebarContainer isOpen={isOpen}>
            <BackButton
                src={require("../assets/images/뒤로가기.png")}
                alt="닫기"
                onClick={toggleSidebar}  // 👈 이미지 클릭 시 닫힘
            />
            <SidebarContent>
                <Link to="/MyArticles">
                    <SidebarButton onClick={toggleSidebar}>내가 쓴 글</SidebarButton>
                </Link>
                <Link to="/MyComments">
                    <SidebarButton onClick={toggleSidebar}>내가 쓴 댓글</SidebarButton>
                </Link>
                <Link to="/MyLikes">
                    <SidebarButton onClick={toggleSidebar}>내가 좋아요 한 글</SidebarButton>
                </Link>
            </SidebarContent>
        </SidebarContainer>
    );
};

export default Sidebar;
