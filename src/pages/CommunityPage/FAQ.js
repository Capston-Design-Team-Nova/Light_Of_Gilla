import React,{useState} from 'react';
import Header from '../../components/Header';
import { CommunityListWrapper } from '../../styles/CommunityStyles';
import FAQList from './FAQList';
import SearchField from '../../components/SearchField';
//import Pagination from "../../components/Pagination";
import styled from 'styled-components';
const mobile = "@media screen and (max-width: 480px)";

export const Center = styled.div`
  width: 100%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 90px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color:#fdf6ec;/*#ffece3;*/

  ${mobile} {
    padding-bottom: 50px;
  }
`;
//width: 100%;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color:#fdf6ec;/*#ffece3;*/
`;

export const TopRow = styled.div`
    width: 78%;
 
  transition: margin-left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;

    ${mobile} {
    width: 90%;
    flex-direction: column;
    margin-left: 0;
    align-items: stretch;
     gap: 1px; /*  모바일에서 간격만 좁게 조절 */
  }
`;

export const Content = styled.div`
  position: relative; // 기준이 되는 부모
  width: 80%;
   
  transition: margin-left 0.3s ease;
  min-height: 70vh; /* 내용이 너무 적을 때는 최소 높이 보장 */
  height: auto;
  background-color: white;
  border-radius: 15px;

  overflow: visible; // 자식 요소 넘침 방지
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

box-shadow: 0 2px 4px rgba(202, 201, 201, 0.3),   /* 아래 */
    0 -2px 4px rgba(202, 201, 201, 0.3),  /* 위 */
    2px 0 4px rgba(202, 201, 201, 0.3),   /* 오른쪽 */
    -2px 0 4px rgba(202, 201, 201, 0.3);  /* 왼쪽 */

  ${mobile} {
    width: 95%;
    height: auto;
    margin-top: 5px;
    margin-left: 0;
  }
`;

function FAQ() {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (term) => {
        console.log("검색어:", term);
        setSearchTerm(term);
        // 여기에 검색 요청 로직 추가 가능
    };

    {/*const handleSearch = async (term) => {
        setSearchTerm(term);
        const searchString = encodeURIComponent(term);
        if (term && searchString !== "") {
          try {
           
            const response = await axios.get(
              `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/search/${searchString}`
            );
            setPosts(response.data);
          } catch (error) {
            console.error("검색 오류:", error);
          }
        } else {
          try {
            const response = await axios.get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/`);
            console.log("게시글 데이터를 불러오는 중");
            setPosts(response.data);
          } catch (error) {
            console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
          }
        }
      }; */}
  // 페이지네이션 상태와 로직 추가
  //const [currentPage, setCurrentPage] = useState(1);
  //const postsPerPage = 10; /*한 페이지에 글 10개씩 보여주기*/
  
  // 현재 페이지의 게시글 계산
 {/*} const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  // 총 페이지 수
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  
  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // 선택 시 스크롤 맨 위로
  };*/}
    return (
        <Main>
            <Header />           
            <Center>
                <TopRow >
                    <SearchField onSearch={handleSearch}/>
                    <div style={{ flex: 1 }} /> {/* 여백을 넣어서 오른쪽 요소들을 밀어냄 */}
                    
                    
                </TopRow>
                
                <Content >
                  <CommunityListWrapper>
                    <FAQList searchTerm={searchTerm}/>
                  </CommunityListWrapper>
                    
                    
                    {/* 페이지네이션 */}
                    {/*{totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}*/}           
                </Content>
            </Center>
        </Main>
    );
}

export default FAQ;