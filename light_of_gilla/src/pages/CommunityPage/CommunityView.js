import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate, Await } from "react-router-dom";
import styled from "styled-components";
import { Main,ToggleButton } from "../../styles/CommunityStyles";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';

const Content = styled.div`
width: calc(97% - 250px);
  margin-left: 250px;
  
  min-height: auto;
  
  
  background-color: white;
  padding: 2rem 0; // ✅ 위아래 여백 추가
  border-radius: 15px;

  box-shadow: 0 2px 4px rgba(187, 187, 187, 0.3),   /* 아래 */
    0 -2px 4px rgba(187, 187, 187, 0.3),  /* 위 */
    2px 0 4px rgba(187, 187, 187, 0.3),   /* 오른쪽 */
    -2px 0 4px rgba(187, 187, 187, 0.3);  /* 왼쪽 */
  overflow: visible;
 overflow-x: hidden; // 양옆으로 삐져나온 거 안 보이게
box-sizing: border-box; // 내부 패딩, 보더 포함해서 계산

  ${mobile} {
    width: 95%;
    margin-left: 0;
    
    border-radius: 15px;
    height:100%;
  }
`;
//  box-shadow: 0 0 4px rgba(0,0,0,0.05); // ✅ 자연스러운 경계 
export const Center = styled.div`
  width: 100%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 90px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color: #FEF7FF;/*#ffece3;*/

  ${mobile} {
    padding-bottom: 100px;
  }
`;
  

const Wrapper = styled.div`
  width: 90%;
  margin: 0.5rem auto; // ✅ 상하 여백 확보
  padding-bottom: 1rem;
  box-sizing: border-box;
`;
const CommentsWrapper = styled.div`
  max-height: none; // ✅ 아예 제한하지 않음
  overflow-y: visible;
  margin-bottom: 0.4rem;

`;
const Title = styled.h1`
    color: #000;
    font-family: OurFont11;
    font-size: 2.3rem;
    margin-bottom: 1rem;
     ${mobile} {
    font-size: 22px;
  }
`;

const Meta = styled.div`
  color: #00000080;
  font-size: 1.3rem;
  font-family: OurFont12;
  margin-bottom: 1rem;

   ${mobile} {
    font-size: 13px;
  }
`;

const Content1 = styled.p`
  line-height: 1.6;
  font-size: 1.6rem;
  font-family: OurFont12;

   ${mobile} {
    font-size: 17px;
  }
  `;

const Category = styled.p`
  line-height: 1.6;
  font-family: OurFont12;
  font-size: 1.3rem;
  color: #FF710B;
  margin-top:20px;

   ${mobile} {
    font-size: 15px;
  }
  `;

const Button = styled.button`
  margin-top: 3px;
  padding: 0.5rem 1rem;
  font-family: 'OurFont10';
  font-size:0.9rem;
  border: none;
  background: #F8C743;
  color: black;
  border-radius: 6px;
  cursor: pointer;
  width:60px;
  height:45px;
  margin-right:1rem;
`;

const Button2 = styled.button`
  margin-top: 3px;
  padding: 0.5rem 1rem;
  border: none;
  background: #F8C743;
  color: black;
  border-radius: 6px;
  cursor: pointer;
  width:60px;
  height:45px;

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
  white-space: nowrap;
  align-items: center;           // ✅ 버튼 안 글자 중앙정렬
  font-size: 1.1rem;

   ${mobile} {
    font-size: 14px;
  }
`;

const CommentSection = styled.div`
  overflow-y: visible;
  flex: 1;
  padding: 1rem 0;
margin-bottom: 1rem;
  
      ${mobile} {
    max-height: none; // ✅ 제거해줘야 전체 스크롤 가능
  
  }
`;

//padding-bottom: 70px;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const CommentForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  gap: 0.5rem;
  background: white;
  border:none;

  textarea {
    flex: 1;
    height: 45px;
    font-size: 15px;
    resize: none;
    border-radius: 10px;
    background-color: #DDDDDD;
    border: 1px solid #DDDDDD;
  }

  button {

    font-size: 15px;
    padding-bottom: 20px;
  }

  ${mobile} {
    position: fixed;           // ✅ 모바일에서만 고정
    bottom:0;
    left: 0;
    width: 95%;
    z-index: 998;
    padding: 0.5rem 0.7rem;
    padding-bottom: 50px;
    background: white;
    border-top: 1px solid #ccc;
    textarea {
      height: 36px;
      font-size: 14px;
    }

    button {
      font-size: 18px;

    }
  }
`;

const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;     // ✅ 좌우 정렬 (웹)
  align-items: center;
  border-top: 0.5px solid #00000073;
  border-bottom: 0.5px solid #00000073;
  padding: 0.6rem 10rem;
  flex-wrap:wrap;

  ${mobile} {
    justify-content: center;         // ✅ 모바일은 가운데 정렬
    gap: 1rem;                        // ✅ 둘 간격
    flex-wrap: nowrap;               // ✅ 줄바꿈 방지
    padding: 0.6rem 0.5rem;
  }
`;


const RowHalf = styled.div`
  flex: 0 1 auto; 
  width: auto;
  min-width: 0;                       // ✅ 두 영역 너비 똑같이
  display: flex;
  justify-content: center;      // ✅ 가운데 정렬
  align-items: center;
  padding: 0 1rem;              // ✅ 패딩 동일하게
  box-sizing: border-box;
  

  ${mobile} {
    width: 40%;
    flex-direction: row;
    justify-content: center;
    padding:  0 ; 
    min-width: 0;  
    flex-shrink: 1;
    white-space:nowrap;
  }
`;

const H3 = styled.h3`
  margin: 0;                     // ✅ 마진 제거
  font-family: Ourfont5;
  font-size: 1.1rem;
  height: 32px;                  // ✅ 버튼과 동일한 높이
  display: flex;
  align-items: center;           // ✅ 중앙 정렬
white-space: nowrap;

 ${mobile} {
    font-size: 14px;
  }

  `;


const AuthorImg = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 4px;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  flex-shrink:0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff5555;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 0.5rem;
  align-self: flex-start;
  white-space: nowrap;
`;


const CommentContent = styled.div`
  flex: 1;  // ✅ 가능한 공간 모두 차지
  display: flex;
  font-size: 1.2rem;
  flex-direction: column;
  word-break: break-word;
  overflow-wrap: break-word;
`;


const Nickname = styled.strong`
font-size:1.35rem;
  font-weight: bold;
  margin-bottom: 2px;
  ${mobile} {
    font-size: 16px;
  }
`;


const CommentText = styled.div`
  font-family:'OurFont12';
  font-size: 1.2rem;
  line-height: 1.4;
  word-break: break-word;       // ✅ 긴 단어도 줄바꿈
  white-space: pre-wrap;        // ✅ 줄바꿈과 공백 유지
  overflow-wrap: break-word;

    ${mobile} {
    font-size: 14px;
  }
  `;

const defaultProfileImage = require("../../assets/images/profileimage2.png");
const CommunityView = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480); 
    const [postData, setPostData] = useState(null); 
    const [comments, setComments] = useState([]);
    const name=localStorage.getItem("nickname");
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  const { id } = useParams();
  const navigate = useNavigate();

  const [userMap, setUserMap] = useState({});  // <- 여기에 추가


  useEffect(() => {
    // API 호출
    axios
        .get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/${id}`)  
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


  // 2) **전체 유저 목록**을 한 번만 불러와서 nickname→이미지 URL 맵 만들기
  useEffect(() => {
    axios
      .get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users")
      .then(res => {
        const map = {};
        res.data.forEach(user => {
          // profileImage가 절대 경로인지, 상대 경로인지 처리
          const raw = user.profileImage;
          let url;

          if (!raw || raw === "null") {
            url = defaultProfileImage;
          } else if (raw.startsWith("http")) {
            url = raw; // 이미 전체 URL이면 그대로
          } else {
            const fileName = raw.split("/").pop(); // 파일명만 추출
            url = `https://ddo857ydmq0nf.cloudfront.net/profiles/${fileName}`;
          }


          map[user.nickname] = url;
        });
        setUserMap(map);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, [comments]);  // 빈 deps → 컴포넌트 마운트 시 한 번만 실행
  
  // const [likes, setLikes] = useState(postData.likes);
  const [newComment, setNewComment] = useState({ writer: "", text: "" });
  const [commentCount, setCommentCount] = useState(0);
  const [likes, setLikes] = useState(0);
 const [hasLiked, setHasLiked] = useState(false); // ✅ 유저가 이미 좋아요 눌렀는지
 useEffect(() => {
  const checkIfLiked = async () => {
    try {
      const response = await axios.get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/hasliked`, {
        params: { post_id: id, nickName: name }
      });
      setHasLiked(response.data); // true or false
    } catch (error) {
        console.error('좋아요 업데이트 중 오류 발생:', error);
    }
  
  };
  checkIfLiked(); // ✅ 호출 잊지 말기
  }, [id, name]);
  
  const handleLike = async () => {
    try {
      const response = await axios.post(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/like`, {
        post_id: id,
        nickName: name
      });
  
      const liked = response.data.liked; // ✅ 실제 boolean 값 추출
      console.log("좋아요 응답:", liked);
  
      setHasLiked(liked);
      setLikes((prev) => liked ? prev + 1 : prev - 1);
  
    } catch (error) {
      console.error("좋아요 처리 오류:", error);
    }
  };
  
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("댓글 제출 클릭됨");

    const name = localStorage.getItem("nickname"); // ✨ 여기서 실시간으로 가져옴

    // 닉네임이 없는 경우 막기
    if (!name) {
      alert("닉네임 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
      return;
    }

    const count = commentCount + 1; // UI 업데이트를 위해 좋아요 수 증가
    setCommentCount(count); // UI 먼저 업데이트
    
  if (!newComment.text) return;

  const newCommentObj = {
    user_id: newComment.writer,
    comment: newComment.text,
    post_id: id,
    nickName: name,
    
  };
  console.log("NickName:", newCommentObj.nickName);
  console.log("댓글 작성 시 닉네임:", name);
  console.log("localStorage nickname:", localStorage.getItem("nickname"));
  // 1. 백엔드로 댓글 전송 (POST 요청 예시)
  axios.post(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/comment/save`, newCommentObj)
  .then(() => {
    // 댓글 저장 후 해당 게시글의 전체 데이터를 다시 요청
    return axios.get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/${id}`);
  })
  .then((response) => {
    const { post, comments } = response.data;
    setPostData(post);
    setComments(comments); // 댓글 목록 최신화
    setLikes(post.likes);
    setCommentCount(post.commentCounts); // 댓글 수도 최신화
    setNewComment({ writer: "", text: "" }); // 입력 폼 초기화
  })
  .catch((error) => {
    console.error("댓글 추가 오류 또는 새로고침 오류:", error);
  });
  };

console.log("댓글 쓸 때 nickname:", name);
  const handleCommentKeyPress = (e) => {
    // Check if the Enter key was pressed (keyCode 13 or e.key === "Enter")
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent the default behavior of creating a new line
        handleCommentSubmit(e); // Submit the comment
    }
};
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("정말 이 글을 삭제하시겠습니까?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/delete/${postId}`);
      alert("글이 삭제되었습니다.");
      navigate("/Community"); // 삭제 후 커뮤니티 목록으로 이동
    } catch (err) {
      console.error("글 삭제 오류:", err);
      alert("글 삭제 중 오류가 발생했습니다.");
    }
  };
 
const handleCommentDelete = async (commentId) => {
  if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

  try {
    // 백엔드에 맞게 endpoint URL 수정하세요
    await axios.delete(
      `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/comment/delete/${commentId}`
    );
    // 삭제 후 state에서 제거
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setCommentCount((prev) => prev - 1);
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    alert("댓글 삭제에 실패했습니다.");
  }
};


  if (!postData) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <Main>
        <Header />
            {/* Sidebar */}
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {window.innerWidth <= 480 && !isSidebarOpen && (
                  <ToggleButton onClick={toggleSidebar}>
                    <img src={require("../../assets/images/햄버거버튼.png")} alt="메뉴" />
                  </ToggleButton>
                )}
                
                <Content isSidebarOpen={isSidebarOpen}>
                {postData.nickName === name && ( // 닉네임이 같을 경우에만 수정, 삭제 버튼 보여줌
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px",marginRight: "20px", justifyContent: "flex-end",  // 오른쪽 정렬
  alignItems: "center",width: "100%" }}>
                    <Button onClick={() => navigate(`/edit/${postData.post_Id}`)}>수정</Button>
                    <Button onClick={() => handleDelete(postData.post_Id)}>삭제</Button>
                  </div>
                )}

                <Wrapper>
                    <Title>{postData.title}</Title>
                    <Meta>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AuthorImg src={userMap[postData.nickName] || defaultProfileImage}
                                    onError={e => { e.currentTarget.src = defaultProfileImage; }}
                                    alt="작성자 이미지"/>
                        <span>{postData.nickName} | {postData.postCreated_date}</span>
                      </div>
                    </Meta>
                    <Content1>{postData.content}</Content1>
                     <Category>#{postData.category}</Category>
                    <MiddleRow>
                      <RowHalf>
                        <LikeButton onClick={handleLike}>
                          {hasLiked ? "💗 좋아요 " : "♡ 좋아요 "} {likes}개
                        </LikeButton>
                      </RowHalf>
                      <RowHalf>
                        <H3>💬 댓글 ({commentCount})</H3>
                      </RowHalf>
                    </MiddleRow>

                    <CommentsWrapper>
                      <CommentSection>
                        {comments.map((c) => (
                        <CommentItem key={c.id} >
                          <ProfileImg
                            
                            src={userMap[c.nickName] || defaultProfileImage}
                            onError={e => {e.currentTarget.onerror = null;
    e.currentTarget.src = defaultProfileImage; }}
                            alt="댓글 작성자 이미지"/>
                          <CommentContent>
                            <Nickname>{c.nickName}</Nickname>
                            <CommentText>{c.comment}</CommentText>
                          </CommentContent>
                          {/* 본인 댓글일 때만 삭제 버튼 */}
                          {/* 오른쪽: 본인 댓글일 때만 삭제 */}
                          {c.nickName === name && (
                          <DeleteButton onClick={() => handleCommentDelete(c.id)}>
                            삭제
                          </DeleteButton>
                          )}
                        </CommentItem>
                        ))}
                      </CommentSection>
                    </CommentsWrapper>
                    <CommentForm onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="댓글 쓰기"
                                rows="3"
                                value={newComment.text}
                                onChange={(e) =>
                                setNewComment({ ...newComment, text: e.target.value })}
                                onKeyDown={handleCommentKeyPress}
                          
                            />
                            <Button2 type="submit">⬆</Button2>
                    </CommentForm>                 
                </Wrapper>
              </Content>                
            </Center>
        </Main>    
  );
}

export default CommunityView;