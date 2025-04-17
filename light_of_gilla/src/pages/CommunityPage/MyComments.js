import React,{useState, useEffect} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow,ToggleButton,CommunityListWrapper } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
import SearchField from '../../components/SearchField';
import Pagination from "../../components/Pagination";
import axios from 'axios';

function MyComments() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [myCommentedPostIds, setMyCommentedPostIds] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const userId = localStorage.getItem("userId"); // 현재 로그인된 유저
  
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


      useEffect(() => {
        const fetchData = async () => {
          try {
            // 1. 전체 댓글 가져오기
            const commentsRes = await axios.get("https://www.thegilla.com/comment/all");
            const myComments = commentsRes.data.filter(c => c.user_id === userId);
            const postIds = [...new Set(myComments.map(c => c.post_id))]; // 중복 제거
    
            setMyCommentedPostIds(postIds);
    
            // 2. 전체 게시글 가져오기
            const postsRes = await axios.get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/view");
            setPosts(postsRes.data);
    
            // 3. 내가 댓글 단 글만 필터링
            const filtered = postsRes.data.filter(post => postIds.includes(post.post_Id));
            setFilteredPosts(filtered);
          } catch (err) {
            console.error("데이터 불러오기 오류:", err);
          }
        };
    
        fetchData();
      }, [userId]);
// 페이지네이션 상태와 로직 추가
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; /*한 페이지에 글 10개씩 보여주기*/
  
  // 현재 페이지의 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // 총 페이지 수
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  
  // 페이지 변경 함수
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
                      <CommunityList posts={filteredPosts} />
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

export default MyComments;