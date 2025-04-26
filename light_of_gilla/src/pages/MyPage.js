import React from "react";
import Header from "../components/Header";
import {Main, Center, Title, ProfileImage, 
    UserEmail, Birthday, UserName, UserId,
     NewPassword, CheckNewPassword, SaveButton} from "../styles/MyPageStyles";

function MyPage(){

    return(
        <Main>
            <Header />
            <Center>
                <Title>마이페이지</Title>
                <ProfileImage><img
                  src={require("../assets/images/ProfileImage.png")}
                  alt="프로필사진"
                /></ProfileImage>
                <UserEmail>abcd1234@naver.com</UserEmail>
                <Birthday>1999.09.09</Birthday>
                <UserName>이름(닉네임)</UserName>
                <UserId>아이디</UserId>
                <NewPassword>새 비밀번호</NewPassword>
                <CheckNewPassword>새 비밀번호 확인</CheckNewPassword>

                <SaveButton>저장</SaveButton>
            </Center>
            


        </Main>
    )
}

export default MyPage;