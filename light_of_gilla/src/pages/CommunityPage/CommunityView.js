import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { posts } from "./data";
import { Main,Center,ToggleButton,Content } from "../../styles/CommunityStyles";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

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
  width:60px;
  height:32px;
  padding: 0.5rem 1rem;
  border: none;
  background: #F8C743;
  color: black;
  border-radius: 6px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  margin-top: 3px;
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: black;
  cursor: pointer;
`;

const CommentTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Ourfont5;
  gap: 8px;
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
`;

const MiddleRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:550px;
    flex-wrap: wrap; /* 반응형 대응 */
    border-top: 0.5px solid #00000073;
    border-bottom: 0.5px solid  #00000073;
    height: 57px;
`;
const H3 = styled.h3`
    margin-top: 13px;
    font-family: Ourfont5;
    font-size: 14px;
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

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = posts.find((p) => p.id === Number(id));

  const [likes, setLikes] = useState(postData.likes);
  const [comments, setComments] = useState(postData.comments);
  const [newComment, setNewComment] = useState({ writer: "", text: "" });
    const commentRef=useRef(null);
  if (!postData) return <div>글을 찾을 수 없습니다.</div>;

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.writer || !newComment.text) return;

    const newCommentObj = {
      id: comments.length + 1,
      ...newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment({ writer: "", text: "" });
  };
  const scrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <Main>
        <Header />
            {/* Sidebar */}
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                <ToggleButton onClick={toggleSidebar}><img src={require("../../assets/images/햄버거버튼.png")} alt=" " /></ToggleButton>

                <Content isSidebarOpen={isSidebarOpen}>
                <Wrapper>
                    <Title>{postData.title}</Title>
                    <Meta>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AuthorImg src={postData.authorImg} alt="작성자 이미지" />
                        {postData.author} | {postData.createdAt}
                      </div>
                    </Meta>
                    <Content1>{postData.content}</Content1>
                    <Category>#{postData.category}</Category>
                    <MiddleRow>
                        <LikeButton onClick={handleLike}>♡좋아요 {likes}개</LikeButton>
                        <H3 onClick={scrollToComments} style={{ cursor: "pointer" }}>💬 댓글 ({comments.length})</H3>
                    </MiddleRow>

                    <CommentSection ref={commentRef}>        
                        {comments.map((c) => (
                        <CommentItem key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ProfileImg src={c.profileImg} alt="댓글 작성자 이미지" />
                        <CommentTextWrapper>
                          
                            <div>{c.writer}</div>
                            <div>{c.text}</div>
                          
                        </CommentTextWrapper>
                        
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

                    {/*<Button onClick={() => navigate(-1)}>← 돌아가기</Button>*/}
                </Wrapper>
                </Content>
                
                
            </Center>
        </Main>

    
  );
};

export default CommunityView;


{/*import React from "react";
import Header from "../../components/Header";
import { Main, Center, Content, Button } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunitySidebar from './CommunitySidebar';

function CommunityView() {

    return (
        <Main>
            <Header />
            <CommunitySidebar width={450} />
            <Center>
                
                <Link to="/Write">
                <Button>수정</Button>
                </Link>
                <Button>삭제</Button>
                <Content>
                    {/*제목, 내용, 작성시간, 닉네임 불러오기*/}
                    {/*<Button1>좋아요</Button1>
                    <Button1>댓글</Button1>
                    {/*댓글 단 사용자 프로필사진, 닉네임, 댓글 내용 불러오기*/ }
                {/*</Content>              
                
            </Center>
        </Main>
    );
}*/}