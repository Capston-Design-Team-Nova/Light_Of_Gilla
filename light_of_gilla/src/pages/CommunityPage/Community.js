import React,{ useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow, ToggleButton} from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CustomSelect from './CustomSelect';
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
import SearchField from '../../components/SearchField';

function Community() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    
    return (
        <Main>
            <Header />
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {!isSidebarOpen && (
                <ToggleButton onClick={toggleSidebar}>
                    <img src={require("../../assets/images/햄버거버튼.png")} alt="메뉴" />
                </ToggleButton>
                )}
                
                <TopRow isSidebarOpen={isSidebarOpen}>
                    {/* 검색 필드 */}
                    <SearchField />
                    <div style={{ flex: 1 }} /> {/* 여백을 넣어서 오른쪽 요소들을 밀어냄 */}
                    <CustomSelect />
                    <Link to="/Write">
                    <Button>글쓰기</Button>
                    </Link>
                </TopRow>
                <Content isSidebarOpen={isSidebarOpen}>
                    <CommunityList />
                </Content>              
                
            </Center>
        </Main>
    );
}

export default Community;