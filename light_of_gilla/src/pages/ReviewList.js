import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//import axios from "../api/axiosInstance";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const BASE_URL =
  "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api";

// 스타일 정의
const mobile = '@media screen and (max-width: 480px)';

const PostList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; // ✅ 아이템들을 수직 방향으로 가운데 정렬
  margin: 8px auto;
`;

const PostItem = styled.div`
  width: 85%; // ✅ 카드 너비 고정
  max-width: 820px; // ✅ 너무 넓어지는 것 방지
  padding: 1rem;
  border: 1px solid #a09f9f;
  border-radius: 20px;
  margin-bottom: 0.5rem;
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PostTitle = styled.h2`
  font-size: 1.3rem;
  font-family:OurFont8;
  color: #1d1b20;
  margin: 0;
  flex: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${mobile} {
    font-size: 15px;
     
    }
`;

const PostTime = styled.div`
  font-size: 1.2rem;
  color: #555;
  flex: 1;
  ${mobile} {
    font-size: 12px;
     
    }
`;

const PostRating = styled.div`
  font-size: 1.2rem;
  color: #000;
  flex: 1;
  color: #f2b84b; // 별 색상
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  ${mobile} {
    font-size: 12px;
     
    }
`;

const PostContent = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-top: 15px;
  ${mobile} {
    font-size: 14px;
     
    }
`;

const HospitalInfo = styled.div`
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
  ${mobile} {
    font-size: 11px;
     
    }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 2rem;
`;

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [hospitalMap, setHospitalMap] = useState({});

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // 정수 부분
    const hasHalfStar = rating % 1 >= 0.5; // 0.5 이상이면 반 개
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // 꽉 찬 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} />);
    }

    // 반 개 별
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    // 빈 별
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} />);
    }

    return stars;
  };

  useEffect(() => {
    const userName = localStorage.getItem("nickname");

    if (!userName) {
      console.error("유저 이름이 없습니다. 로그인 필요.");

      return;
    }

    const fetchMyReviews = async () => {
      try {
        // 1. 리뷰 가져오기
        const res = await axios.get(`${BASE_URL}/reviews/my`, {
          headers: {
            "X-User-Name": encodeURIComponent(userName),
          },
        });
        console.log(res.data);
        const reviewData = res.data;
        setReviews(reviewData);
        console.log("유저명:", userName);
        console.log("리뷰 데이터:", reviews);
        // 2. 병원 ID 목록 뽑기
        const uniqueHospitalIds = [
          ...new Set(reviewData.map((r) => r.hospitalId)),
        ];

        // 3. 병원 정보 요청
        const hospitalDataMap = {};
        await Promise.all(
          uniqueHospitalIds.map(async (id) => {
            try {
              const response = await axios.get(`${BASE_URL}/hospitals/${id}`, {
                headers: {
                  "X-User-Name": encodeURIComponent(userName),
                },
              });
              const { name, department, address } = response.data;
              hospitalDataMap[id] = { name, department, address };
            } catch (err) {
              console.error(`병원 ID ${id} 정보 요청 실패`, err);
              hospitalDataMap[id] = {
                name: "병원 이름 없음",
                department: "-",
                address: "-",
              };
            }
          })
        );
        console.log("병원 매핑 데이터:", hospitalMap);
        setHospitalMap(hospitalDataMap);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      }
    };

    fetchMyReviews();
  }, []);

  return (
    <PostList>
      {reviews.length === 0 ? (
        <EmptyMessage>작성한 리뷰가 없습니다.</EmptyMessage>
      ) : (
        reviews.map((review) => {
          const hospital = hospitalMap[review.hospitalId];
          return (
            <PostItem key={review.id}>
              <PostRow>
                <PostTitle style={{ flex: 2 }}>
                  {hospital ? hospital.name : "병원 이름 불러오는 중..."}
                </PostTitle>
                <PostRating style={{ flex: 1, textAlign: "center" }}>
                  {renderStars(review.rating)}
                </PostRating>
                <PostTime style={{ flex: 1, textAlign: "right" }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </PostTime>
              </PostRow>

              {hospital && <HospitalInfo>🏥 {hospital.address}</HospitalInfo>}
              <PostContent>"{review.content}"</PostContent>
            </PostItem>
          );
        })
      )}
    </PostList>
  );
}

export default ReviewList;
