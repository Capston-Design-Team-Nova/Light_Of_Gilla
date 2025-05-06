import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const BASE_URL = "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api";

// 스타일 정의
const PostList = styled.div`
  width: 100%;
   display: flex;
  flex-direction: column;
  align-items: center; // ✅ 아이템들을 수직 방향으로 가운데 정렬
  margin: 8px auto;
`;

const PostItem = styled.div`
  width: 85%; // ✅ 카드 너비 고정
  max-width: 800px; // ✅ 너무 넓어지는 것 방지
  padding: 1rem;
  border: 1px solid #A09F9F;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 0.5rem;

 
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
`;

const PostTime = styled.div`
  font-size: 14px;
  color: #555;
  flex: 1;
`;

const PostRating = styled.div`
  font-size: 14px;
  color: #000;
  flex: 1;
`;

const PostContent = styled.p`
  font-size: 15px;
  color: #333;
  margin-top: 15px;
`;

const HospitalInfo = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 2rem;
`;

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [hospitalMap, setHospitalMap] = useState({});
  

  useEffect(() => {
    const userName = localStorage.getItem("emailOrUserId");
    if (!userName) {
      console.error("유저 이름이 없습니다. 로그인 필요.");
      return;
    }

    const fetchMyReviews = async () => {
      try {
        // 1. 리뷰 가져오기
        const res = await axios.get(`${BASE_URL}/reviews/my`, {
          headers: {
            "X-User-Name": userName,
          },
        });
        const reviewData = res.data;
        setReviews(reviewData);

        // 2. 병원 ID 목록 뽑기
        const uniqueHospitalIds = [...new Set(reviewData.map(r => r.hospitalId))];

        // 3. 병원 정보 요청
        const hospitalDataMap = {};
        await Promise.all(
          uniqueHospitalIds.map(async (id) => {
            try {
              const response = await axios.get(`${BASE_URL}/hospitals/${id}`, {
                headers: {
                  "X-User-Name": userName,
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
            <PostItem key={review.id} >
              <PostRow>
  <PostTitle style={{ flex: 2 }}>{hospital ? hospital.name : "병원 이름 불러오는 중..."}</PostTitle>
  <PostRating style={{ flex: 1, textAlign: "center" }}>⭐{review.rating}</PostRating>
  <PostTime style={{ flex: 1, textAlign: "right" }}>{new Date(review.createdAt).toLocaleDateString()}</PostTime>
</PostRow>
              
              {hospital && (
                <HospitalInfo>
                  🏥  {hospital.address}
                </HospitalInfo>
              )}
              <PostContent>"{review.content}"</PostContent>
            </PostItem>
          );
        })
      )}
    </PostList>
  );
}

export default ReviewList;
