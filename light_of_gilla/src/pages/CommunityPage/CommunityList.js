import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';


const PostList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; // 가운데 정렬
`;

const PostListInner = styled.div`
  width: 97%;
 
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

const PostTitle = styled.h2`
  margin: 0;
  font-family: Ourfont5;
  font-size: 1.1rem;
  color: #1D1B20;
  flex: 2; /* 공간을 더 많이 차지하도록 설정 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

   ${mobile} {
    font-size: 12px;
  }
`;

const PostAuthor = styled.div`
  font-family: Ourfont5;
  font-size: 1.1rem;
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
  font-family: Ourfont5;
  font-size: 1.1rem;
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
  font-family: Ourfont5;
  font-size: 1.1rem;
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

function CommunityList({posts}){
  const navigate = useNavigate();
  return(
    <PostList>
      <PostListInner>
        

        {/* ✅ 실제 게시글 목록 */}
        {posts.map((post) => (
          <PostItem key={post.post_Id} onClick={() => navigate(`/post/${post.post_Id}`)}>
            <PostRow>
              <PostTitle>{post.title}({post.commentCounts})</PostTitle>
              <PostAuthor>{post.nickName}</PostAuthor>
              <PostTime>{post.postCreated_date}</PostTime>
              <PostLikes>💗{post.likes}</PostLikes>
            </PostRow>
          
          </PostItem>
        ))}
      </PostListInner>
      
    </PostList>
    
    
    
  );
}

export default CommunityList;
