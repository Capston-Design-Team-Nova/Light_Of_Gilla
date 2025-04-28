import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination"; 
import {
  Main,
  Center,
  Content,
  Button,
  TopRow,
  ToggleButton, CommunityListWrapper
  
} from "../../styles/CommunityStyles";
import { Link } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import CommunityList from "./CommunityList";
import Sidebar from "../../components/Sidebar";
import SearchField from "../../components/SearchField";

function Community() {
  const Email = localStorage.getItem("Email");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    console.log("Email:",Email);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/post/view`);
        console.log("게시글 데이터를 불러오는 중");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    const getNickName = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/post/getNickName?value=${Email}`);
        console.log("닉네임임 데이터를 불러오는 중");
        localStorage.setItem("nickname", response.data);
        console.log("nickname",response.data);

      } catch (error) {
        console.error("사용자가 없음:", error);
      }
    };
    fetchPosts();
    getNickName();
  }, []);
  const handleSelectChange = async (value) => {
    console.log("선택한 카테고리:", value);
    const category = encodeURIComponent(value);
    try {
      const response = await axios.get(
        `http://localhost:8082/post/category/${category}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("카테고리별 게시글 불러오기 오류:", error);
    }
  };
  const handleSearch = async (term) => {
    setSearchTerm(term);
    const searchString = encodeURIComponent(term);
    if (term && searchString !== "") {
      try {
       
        const response = await axios.get(
          `http://localhost:8082/post/search/${searchString}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("검색 오류:", error);
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:8082/post/`);
        console.log("게시글 데이터를 불러오는 중");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    }
  };
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
      <Center>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
        {!isSidebarOpen && (
          <ToggleButton onClick={toggleSidebar}>
            <img
              src={require("../../assets/images/햄버거버튼.png")}
              alt="메뉴"
            />
          </ToggleButton>
        )}

        <TopRow isSidebarOpen={isSidebarOpen}>
          {/* 검색 필드 */}
          <SearchField onWrite={handleSearch} />
          <div style={{ flex: 1 }} />{" "}
          {/* 여백을 넣어서 오른쪽 요소들을 밀어냄 */}
          <CustomSelect onChange={handleSelectChange} />
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

export default Community;


{/*<PaginationWrapper>
          <PageButton>{"«"}</PageButton>
          <PageButton>{"<"}</PageButton>
          <ActivePageButton>1</ActivePageButton>
          {/*현재 위치한 페이지를 효과로 나타냄 */}
          {/*<PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>4</PageButton>
          <PageButton>5</PageButton>
          <PageButton>{">"}</PageButton>
          <PageButton>{"»"}</PageButton>
        </PaginationWrapper>*/}