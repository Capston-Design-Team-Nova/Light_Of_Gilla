import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow,ToggleButton,CommunityListWrapper } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
import SearchField from '../../components/SearchField';
import axios from "axios";
import Pagination from "../../components/Pagination";

function MyLikes() {
    const token = localStorage.getItem("token");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const NickName=localStorage.getItem("nickname");
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    useEffect(()=>{
        const fetchPosts = async () => {
            const name = encodeURIComponent(NickName);
        try {
            const response = await axios.get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/mylike?value=${name}`);
            console.log("댓글글 데이터를 불러오는 중");
            setPosts(response.data);
        } catch (error) {
            console.error("댓글글 데이터를 불러오는 중 오류 발생:", error);
    }
        };
        fetchPosts();    
    },[])
// 페이지네이션 상태와 로직 추가
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; /*한 페이지에 글 10개씩 보여주기*/
  
  //현재 페이지의 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  //총 페이지 수
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  
  //페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // 선택 시 스크롤 맨 위로
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
                <CommunityListWrapper>
                        <CommunityList posts={currentPosts} />
                    </CommunityListWrapper>
                    
                    {/* 페이지네이션 */}
                    {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}         
                </Content>              
                
            </Center>
        </Main>
    );
}

export default MyLikes;