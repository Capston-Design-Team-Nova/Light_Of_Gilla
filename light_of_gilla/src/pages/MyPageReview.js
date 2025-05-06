import React from "react";
import Header from "../components/Header";
import { 
    Main, Center, Title, Button,ReviewButton,ReviewButtonRow,
    TitleRow, P,ReviewHeaderRow,RowItem,RowList
} from "../styles/MyPageStyles";
import {CommunityListWrapper} from "../styles/CommunityStyles"
import { useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList"


function MyPageReview() {

    const navigate = useNavigate();
       
    return (
      <Main>
        <Header />
        <Center>
          <TitleRow>
            <Title>마이페이지</Title>
          </TitleRow>
          
          <ReviewButtonRow>
            <ReviewButton onClick={() => navigate("/mypage")}>회원정보수정</ReviewButton>
          </ReviewButtonRow>
          <P>나의 병원 리뷰</P>
          <RowList>
            <RowItem>
            <ReviewHeaderRow>
  <div style={{ flex: 2}}>병원정보</div>
  <div style={{ flex: 1, textAlign: "center" }}>별점</div>
  <div style={{ flex: 1, textAlign: "right" }}>작성일</div>
</ReviewHeaderRow>
            </RowItem>
          </RowList>
          
          <CommunityListWrapper>
            <ReviewList />
          </CommunityListWrapper>

        </Center>
      </Main>
    );
  }
  
  export default MyPageReview;
  