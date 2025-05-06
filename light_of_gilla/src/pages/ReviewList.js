import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const mobile = "@media screen and (max-width: 480px)";
const BASE_URL = "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api";

const PostList = styled.div`
  width: 95%;
  margin: 10px auto;
`;

const PostItem = styled.div`
  padding: 1rem;
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

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 2rem;
`;

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없습니다. 로그인 필요.");
      return;
    }

    const fetchMyReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/reviews/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(res.data);
      } catch (err) {
        console.error("내 리뷰 불러오기 실패:", err);
      }
    };

    fetchMyReviews();
  }, []);

  const goToDetail = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <PostList>
      {reviews.length === 0 ? (
        <EmptyMessage>작성한 리뷰가 없습니다.</EmptyMessage>
      ) : (
        reviews.map((review) => (
          <PostItem key={review.id} onClick={() => goToDetail(review.id)}>
            <PostRow>
              <PostTitle>{review.hospital?.name || "병원 정보 없음"}</PostTitle>
              <PostTime>{new Date(review.createdAt).toLocaleDateString()}</PostTime>
              <PostRating>⭐ {review.rating}</PostRating>
            </PostRow>
            <PostContent>{review.content}</PostContent>
          </PostItem>
        ))
      )}
    </PostList>
  );
}

export default ReviewList;
