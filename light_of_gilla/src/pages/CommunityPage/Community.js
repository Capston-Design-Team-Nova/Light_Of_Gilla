import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow, ToggleButton,ActivePageButton, PageButton,PaginationWrapper} from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CustomSelect from './CustomSelect';
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
import SearchField from '../../components/SearchField';

function Community() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/post/');
                console.log('게시글 데이터를 불러오는 중');
                setPosts(response.data); 
            } catch (error) {
                console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
            }
        };
        fetchPosts();
    }, []);

    
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
                    <CommunityList posts={posts}/>
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

export default Community;