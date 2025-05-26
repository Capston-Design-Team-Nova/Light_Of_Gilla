import React from "react";
import styled from "styled-components";

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';

const PostList = styled.div`

width:100%;
transition: margin-left 0.3s ease;
display:flex;
flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color:rgb(243, 243, 243);
  border-bottom: 1px solid #A09F9F;


  ${mobile} {
    width: 100%;
    margin-left: 0;
  }
`;



const PostRow = styled.div`
display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 95%;
  padding: 1rem 1rem;


`;

const PostTitle = styled.h2`
  margin: 0;
  font-family: OurFont11;
  font-weight:bold;
  font-size: 1.1rem;
  color: #1D1B20;
  flex: 2; /* 공간을 더 많이 차지하도록 설정 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

   ${mobile} {
    font-size: 13px;
  }
`;

const PostAuthor = styled.div`
  font-family: OurFont11;
  font-size: 1.1rem;
  font-weight:bold;
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

const PostTime = styled.div`
  font-family: OurFont11;
  font-size: 1.1rem;
  font-weight:bold;
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

const PostLikes = styled.div`
  font-family: OurFont11;
  font-size: 1.1rem;
  font-weight:bold;
  color: #000;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  white-space: nowrap;
flex: 0.2; /* 균등한 간격을 위한 flex 설정 */

  ${mobile} {
    font-size: 12px;
    
  }

`;

function PostHeader(){
    return(
    <PostList>
      
        
          <PostRow>
            <PostTitle>제목(댓글 수)</PostTitle>
            <PostAuthor>작성자</PostAuthor>
            <PostTime>작성일</PostTime>
            <PostLikes>좋아요 수</PostLikes>
          </PostRow>
        
    </PostList>    
        );
    } 


export default PostHeader;
        