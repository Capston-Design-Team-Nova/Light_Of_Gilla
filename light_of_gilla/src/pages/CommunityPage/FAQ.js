import React,{useState} from 'react';
import Header from '../../components/Header';
//import { CommunityListWrapper } from '../../styles/CommunityStyles';
import FAQList from './FAQList';
import SearchField from '../../components/SearchField';
//import Pagination from "../../components/Pagination";
import styled from 'styled-components';
const mobile = "@media screen and (max-width: 480px)";

export const CommunityListWrapper = styled.div`
  flex: 1;
  width: 100%;
  
  padding: 0 5px 60px; /* 아래 패딩으로 페이지네이션 안 가려지게 */

  ${mobile} {
    
    padding-bottom: 70px;
  }
`;
export const Center = styled.div`
  width: 100%;
  min-height:100vh;
  height:auto;
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 90px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color:#fdf6ec;/*#ffece3;*/

  ${mobile} {
        padding-top: 40px;
    padding-bottom: 50px;
  }
`;
//width: 100%;

export const Main = styled.main`
  width: 100%;
  
  background-color:#fdf6ec;/*#ffece3;*/
`;

export const TopRow = styled.div`
    width: 78%;
 
  transition: margin-left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;

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

{/*export const Title = styled.div`
  position: relative; // 기준이 되는 부모
  width: 80%;  
  font-family:OurFont7;
  font-weight:bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.5rem;
  line-height:1.5;

  p{
    font-size:1.3rem;
  }
    strong{
    font-size:2.6rem;
    }

  ${mobile} {
    width: 95%;
    height: auto;
    margin-left: 0;

    strong{
    font-size:29px;
    }
  }
`;
*/}

function FAQ() {

  const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (term) => {
        console.log("검색어:", term);
        setSearchTerm(term);
        
    };

   
    return (
        <Main>
            <Header />           
            <Center>
                {/*<Title>
                  <strong>자주 묻는 질문</strong>
                </Title>*/}
                <TopRow >
                    <SearchField onSearch={handleSearch}/>
                    <div style={{ flex: 1 }} /> {/* 여백을 넣어서 오른쪽 요소들을 밀어냄 */}
                    
                    
                </TopRow>
                
                <Content >
                  <CommunityListWrapper>
                    <FAQList searchTerm={searchTerm}/>
                  </CommunityListWrapper>                             
                </Content>
            </Center>
        </Main>
    );
}

export default FAQ;