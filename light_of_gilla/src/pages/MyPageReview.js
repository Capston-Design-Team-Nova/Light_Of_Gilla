import React from "react";
import Header from "../components/Header";
import { 
    Main, Center, Title, Button,ReviewButton,ReviewButtonRow,
    TitleRow
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
          <CommunityListWrapper>
            <ReviewList />
          </CommunityListWrapper>

        </Center>
      </Main>
    );
  }
  
  export default MyPageReview;
  