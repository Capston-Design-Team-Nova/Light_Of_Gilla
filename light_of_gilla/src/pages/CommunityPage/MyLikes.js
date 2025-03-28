import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow,ToggleButton,PageButton,PaginationWrapper,ActivePageButton } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
import SearchField from '../../components/SearchField';

function MyLikes() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Main>
            <Header />
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <ToggleButton onClick={toggleSidebar}><img src={require("../../assets/images/햄버거버튼.png")} alt=" " /></ToggleButton>
            <Center>
                <TopRow isSidebarOpen={isSidebarOpen}>
                    <SearchField />
                    <div style={{ flex: 1 }} /> {/* 여백을 넣어서 오른쪽 요소들을 밀어냄 */}
                    
                    <Link to="/Write">
                    <Button>글쓰기</Button>
                    </Link>
                </TopRow>
                <Content isSidebarOpen={isSidebarOpen}>
                    <CommunityList />
                    <PaginationWrapper>
                        <PageButton>{'«'}</PageButton>
                        <PageButton>{'<'}</PageButton>
                        <ActivePageButton>1</ActivePageButton>{/*현재 위치한 페이지를 효과로 나타냄 */}
                        <PageButton>2</PageButton>
                        <PageButton>3</PageButton>
                        <PageButton>4</PageButton>
                        <PageButton>5</PageButton>
                        <PageButton>{'>'}</PageButton>
                        <PageButton>{'»'}</PageButton>
                    </PaginationWrapper>
                </Content>              
                
            </Center>
        </Main>
    );
}

export default MyLikes;