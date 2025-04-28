import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate, Await } from "react-router-dom";
import styled from "styled-components";
import { Main,Center,ToggleButton,Content } from "../../styles/CommunityStyles";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';
// 태블릿 ~ 작은 데스크탑
const tablet = '@media screen and (max-width: 1024px)';

const Wrapper = styled.div`
  width: 90%;
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
  width:60px;
  height:32px;
`;

const LikeButton = styled.button`
  margin: 0;                     // ✅ 위쪽 마진 제거
  padding: 0.3rem 0.7rem;
  height: 32px;                  // ✅ 높이 고정
  background: white;
  color: black;
  cursor: pointer;
  border:none;
  display: flex;
  align-items: center;           // ✅ 버튼 안 글자 중앙정렬
`;

const CommentSection = styled.div`
  max-height: calc(100vh - 150px);  // 전체 높이에서 입력창 공간 제외
  overflow-y: auto;                 // 댓글 목록 스크롤 가능
  padding-bottom: 1rem;             // 아래 공간 여유

  ${mobile} {
    max-height: calc(100vh - 220px);
  }
`;

const CommentItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const CommentForm = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 95%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  padding-bottom: 1rem;

  textarea {
    flex: 1;  // 남은 공간 전부 사용
    padding: 0.5rem;
    height: 30px;
    font-size: 14px;
    resize: none;

    background-color: #DDDDDD;  /*배경색*/
    color: #000000;             /* ✅ 글자색: 검정 */
    border: 1px solid #DDDDDD;     /* ✅ 테두리: 같은색 */
    border-radius: 28px;         /* ✅ 테두리 둥글게 */
  }

  button {
    padding: 0.1rem 1rem;
    white-space: nowrap;
    font-size: 20px;
  }

  ${mobile} {
    bottom: -90px;           
    height: 50%;
    font-size: 11px;
    

    textarea {
      height: 32px;
      font-size: 13px;
    }
    button {
      font-size: 18px;
      padding: 0.1rem 0.8rem;
    }
  }

`;

const MiddleRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 550px;
    flex-wrap: wrap; /* 반응형 대응 */
    border-top: 0.5px solid #00000073;
    border-bottom: 0.5px solid  #00000073;
    height: 57px;

    ${mobile} {
      width: 96%;
      flex-direction: row;   // ✅ 세로 말고 가로 정렬
      justify-content: center;
      align-items: center;   // ✅ 같은 높이 맞추기
      gap: 46px;             // ✅ 요소 사이 간격 설정
      margin-left: 0;
    }

`;

const H3 = styled.h3`
  margin: 0;                     // ✅ 마진 제거
  font-family: Ourfont5;
  font-size: 14px;
  height: 32px;                  // ✅ 버튼과 동일한 높이
  display: flex;
  align-items: center;           // ✅ 중앙 정렬
`;


const AuthorImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 4px;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 7px;
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
        .get(`http://localhost:8082/post/${id}`)  
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
    const name=localStorage.getItem("nickname");
  if (!newComment.text) return;

  const newCommentObj = {
    user_id: newComment.writer,
    comment: newComment.text,
    post_id: id,
    nickName: name
  };
  console.log("NickName:", newCommentObj.nickName);
  // 1. 백엔드로 댓글 전송 (POST 요청 예시)
  axios.post(`http://localhost:8082/comment/save`, newCommentObj)
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
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {!isSidebarOpen && (
                  <ToggleButton onClick={toggleSidebar}>
                    <img
                      src={require("../../assets/images/햄버거버튼.png")}
                      alt="메뉴"
                    />
                  </ToggleButton>
                )}
                
                <Content isSidebarOpen={isSidebarOpen}>
                <Wrapper>
                    <Title>{postData.title}</Title>
                    <Meta>
                    {/*글 작성자 이미지 추가*/}
                    {/*<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        </div><AuthorImg src={postData.authorImg} alt="작성자 이미지" />
*/}
                        {postData.userid} | {postData.created_time}
                    </Meta>
                    <Content1>{postData.content}</Content1>
                     <Category>#{postData.category}</Category>
                    <MiddleRow>
                        <LikeButton onClick={handleLike}>♡좋아요 {likes}개</LikeButton>
                        <H3>💬 댓글 ({commentCount})</H3>
                    </MiddleRow>

                    <CommentSection>        
                        {comments.map((c) => (
                        <CommentItem key={c.id}>
                            {/*<ProfileImg src={c.profileImg} alt="댓글 작성자 이미지" />*/}
                            <strong>{c.nickName}</strong>: {c.comment}
                        </CommentItem>
                        ))}

                        
                    </CommentSection>
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
                    
                </Wrapper>
                </Content>
                
                
            </Center>
        </Main>

    
  );
};

export default CommunityView;


