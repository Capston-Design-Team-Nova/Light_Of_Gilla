import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate, Await } from "react-router-dom";
import styled from "styled-components";
import { Main,Center,TopRow,Content } from "../../styles/CommunityStyles";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0.5rem auto;
`;

const Title = styled.h1`
    color: #000;
    font-family: Ourfont5;
    font-size: 23px;
`;

const Meta = styled.div`
  color: #00000080;
  font-size: 11px;
  margin-bottom: 1rem;
`;

const Content1 = styled.p`
  line-height: 1.6;
  font-size: 14px;
  font-family: Ourfont5;
  `;

const Category = styled.p`
  line-height: 1.6;
  font-size: 15px;
  font-family: Ourfont3;
  color: #FF710B;
  `;

const Button = styled.button`
  margin-top: 5px;
  padding: 0.5rem 1rem;
  border: none;
  background: #F8C743;
  color: black;
  border-radius: 6px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  margin-top: 5px;
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: black;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;

  textarea {
    flex: 1;  // 남은 공간 전부 사용
    padding: 0.5rem;
    height: 30px;
    font-size: 14px;
    resize: none;

    background-color: #D9D9D9;  /*배경색*/
    color: #000000;             /* ✅ 글자색: 검정 */
    border: 1px solid #D9D9D9;     /* ✅ 테두리: 같은색 */
    border-radius: 8px;         /* ✅ 테두리 둥글게 */
  }

  button {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    font-size: 17px;
  }
`;

const MiddleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; /* 반응형 대응 */
    border-top: 0.5px solid #00000073;
    border-bottom: 0.5px solid  #00000073;
    height: 57px;
`;
const H3 = styled.h3`
    margin-top: 5px;
    font-family: Ourfont5;
    font-size: 14px;
`;

const CommunityView = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [postData, setPostData] = useState(null); 
    const [comments, setComments] = useState([]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // API 호출
    axios
        .get(`/post/${id}`)  
        .then((response) => {
            const { post, comments } = response.data;
            setPostData(post);
            setComments(comments);
            setLikes(post.likes); 
            setCommentCount(post.commentCounts);
        })
        .catch((error) => {
            console.error("Error fetching post data:", error);
        });
}, [id]);

  
  

  // const [likes, setLikes] = useState(postData.likes);
  const [newComment, setNewComment] = useState({ writer: "", text: "" });
  const [commentCount, setCommentCount] = useState(0);
  const [likes, setLikes] = useState(0);
  if (!postData) return <div>글을 찾을 수 없습니다.</div>;

  const handleLike = async () => {
    const updatedLikes = likes + 1; // UI 업데이트를 위해 좋아요 수 증가
    setLikes(updatedLikes); // UI 먼저 업데이트

  

    try {
        await axios.post(`http://localhost:8082/post/like?post_id=${id}`);//백틱으로 선언해야함함
      
    } catch (error) {
        console.error('좋아요 업데이트 중 오류 발생:', error);
    }
  
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("댓글 제출 클릭됨");
    const count = commentCount + 1; // UI 업데이트를 위해 좋아요 수 증가
    setCommentCount(count); // UI 먼저 업데이트
  if (!newComment.text) return;

  const newCommentObj = {
    user_id: newComment.writer,
    comment: newComment.text,
    post_id: id
  };
  console.log("Post ID:", newCommentObj.post_id);
  // 1. 백엔드로 댓글 전송 (POST 요청 예시)
  axios.post('/comment/save', newCommentObj)
    .then((response) => {
      // 2. 댓글 추가 후 댓글 목록만 업데이트
      setComments([...comments, newCommentObj]); // 새 댓글 추가
      setNewComment({ writer: "", text: "" }); // 입력 폼 초기화
  
    })
    .catch((error) => {
      console.error("댓글 추가 오류:", error);
    });
  };

  return (
    <Main>
        <Header />
            {/* Sidebar */}
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                <TopRow>
                    <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
                </TopRow>
                <Content>
                <Wrapper>
                    <Title>{postData.title}</Title>
                    <Meta>
                        {postData.userid} | {postData.created_time}
                    </Meta>
                    <Content1>{postData.content}</Content1>
                     {/* {<Category>#{postData.categoryname}</Category>} */}
                    <MiddleRow>
                        <LikeButton onClick={handleLike}>♡좋아요 {likes}개</LikeButton>
                        <H3>💬 댓글 ({commentCount})</H3>
                    </MiddleRow>

                    <CommentSection>        
                        {comments.map((c) => (
                        <CommentItem key={c.id}>
                            <strong>{c.user_id}</strong>: {c.comment}
                        </CommentItem>
                        ))}

                        <CommentForm onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="댓글 쓰기"
                                rows="3"
                                value={newComment.text}
                                onChange={(e) =>
                                setNewComment({ ...newComment, text: e.target.value })
                                }   
                            />
                            <Button type="submit">⬆</Button>
                        </CommentForm>
                    </CommentSection>
                    
                </Wrapper>
                </Content>
                
                
            </Center>
        </Main>

    
  );
};

export default CommunityView;


