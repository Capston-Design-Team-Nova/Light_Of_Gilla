import React from "react";
import Header from "../components/Header";
import { 
    Main, Center, Title, Button,ReviewButton,ReviewButtonRow,
    TitleRow
} from "../styles/MyPageStyles";
import { useNavigate } from "react-router-dom";


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
          
        </Center>
      </Main>
    );
  }
  
  export default MyPageReview;
  