import React from 'react';
import { SidebarContainer, SidebarContent, SidebarButton,BackButton } from '../styles/SidebarStyles';
import { useLocation, Link } from 'react-router-dom';

    
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const isMobile = window.innerWidth <= 480;
    const location = useLocation(); // ✅ 현재 경로 가져오기

    const handleSidebarClick = (path) => {
    if (location.pathname === path) {
      window.location.reload(); // ✅ 현재 위치한 경로를 또 눌렀을 경우: 새로고침
    }
    if (isMobile) toggleSidebar();
  };

    
    return (
        <SidebarContainer isOpen={isMobile ? isOpen : true}>
            {isMobile && (
                <BackButton
                    src={require("../assets/images/뒤로가기.png")}
                    alt="닫기"
                    onClick={toggleSidebar}
                />
      )}
            <SidebarContent>
                <Link to="/Community">
                    <SidebarButton onClick={() => handleSidebarClick("/Community")} 
                    isActive={location.pathname.startsWith("/Community")}>전체 글 목록</SidebarButton>
                </Link>
                <Link to="/MyArticles">
                    <SidebarButton onClick={() => handleSidebarClick("/MyArticles")}
                     isActive={location.pathname.startsWith("/MyArticles")}>내가 쓴 글</SidebarButton>
                </Link>
                <Link to="/MyComments">
                    <SidebarButton onClick={() => handleSidebarClick("/MyComments")}
                     isActive={location.pathname.startsWith("/MyComments")}>내가 쓴 댓글</SidebarButton>
                </Link>
                <Link to="/MyLikes">
                    <SidebarButton onClick={() => handleSidebarClick("/MyLikes")} 
                    isActive={location.pathname.startsWith("/MyLikes")}>내가 좋아요 한 글</SidebarButton>
                </Link>
                <Link to="/faq">
                    <SidebarButton onClick={toggleSidebar} 
                    isActive={location.pathname.startsWith("/faq")}>전문가 FAQ</SidebarButton>
                </Link>

            </SidebarContent>
        </SidebarContainer>
    );
};

export default Sidebar;
