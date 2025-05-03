
import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';


const PostList = styled.div`
  width: 95%;
  margin: 1px;
  padding: 0 0px;

`;

const PostItem = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  margin-bottom: 1px;
  border-bottom: 1px solid #A09F9F;
  transition: 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-evenly; /* 자식 요소 간 균등한 간격 설정 */
  align-items: center;
  flex-wrap: wrap; /* 반응형 대응 */
  width: 100%;
`;

const FAQTitle = styled.h2`
  margin: 0;
  font-family: Ourfont5;
  font-size: 16px;
  color: #1D1B20;
  flex: 2; /* 공간을 더 많이 차지하도록 설정 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

   ${mobile} {
    font-size: 13px;
  }
`;

const FAQAuthor = styled.div`
  font-family: Ourfont5;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  white-space: nowrap;
  flex: 1; /* 균등한 간격을 위한 flex 설정 */

  ${mobile} {
    font-size: 12px;
  }
`;



function FAQList(){
    const navigate = useNavigate();

    // 여기선 하드코딩했지만 실제론 props로 질문 목록을 받아서 map 돌리는 구조가 일반적이에요.
    const handleClick = () => {
      navigate('/faq/:id'); // 예시로 id=1로 이동 (나중에 동적으로 변경 가능)
    };
  
  return(
    <PostList>
        <PostItem onClick={handleClick}>
          <PostRow>
            <FAQTitle>질문</FAQTitle>
            <FAQAuthor>ㅇㅇ과 의사</FAQAuthor>
            
          </PostRow>
          
        </PostItem>
    
    </PostList>
    
    
    
  );
}

export default FAQList;
