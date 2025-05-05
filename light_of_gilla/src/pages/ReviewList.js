import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const mobile = "@media screen and (max-width: 480px)";

// 스타일 컴포넌트
const PostList = styled.div`
  width: 95%;
  margin: 10px auto;
`;

const PostItem = styled.div`
  padding: 1rem;
  margin-bottom: 1px;
  border-bottom: 1px solid #A09F9F;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PostTitle = styled.h2`
  font-size: 16px;
  color: #1D1B20;
  margin: 0;
  flex: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${mobile} {
    font-size: 13px;
  }
`;

const PostTime = styled.div`
  font-size: 14px;
  color: #555;
  flex: 1;

  ${mobile} {
    font-size: 12px;
  }
`;

const PostRating = styled.div`
  font-size: 14px;
  color: #000;
  flex: 1;

  ${mobile} {
    font-size: 12px;
  }
`;

const PostContent = styled.p`
  font-size: 15px;
  color: #333;
  margin-top: 8px;

  ${mobile} {
    font-size: 13px;
  }
`;

// 메인 컴포넌트
function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const userName = "hyunseo"; // 로그인 사용자 이름 (임시)

  useEffect(() => {
    axios
      .get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/user", {
        headers: {
          "X-User-Name": userName,
        },
      })
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("리뷰 불러오기 실패:", err);
      });
  }, []);

  const handleClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`); // 상세 페이지로 이동
  };

  return (
    <PostList>
      {reviews.map((review) => (
        <PostItem key={review.id} onClick={() => handleClick(review.id)}>
          <PostRow>
            <PostTitle>{review.hospital?.name || "알 수 없음"}</PostTitle>
            <PostTime>{new Date(review.createdAt).toLocaleDateString()}</PostTime>
            <PostRating>⭐ {review.rating}</PostRating>
          </PostRow>
          <PostContent>{review.content}</PostContent>
        </PostItem>
      ))}
    </PostList>
  );
}

export default ReviewList;
