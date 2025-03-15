import React from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputField,
  LoginButton,
  SocialLoginContainer,
  KakaoButton,
  GoogleButton,
  FooterButtons,
} from "../styles/LoginStyles";

const LoginModal = ({ onClose }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>GILLA</Title>
        <InputField type="text" placeholder="아이디 입력" />
        <InputField type="password" placeholder="비밀번호 입력" />
        <LoginButton>로그인</LoginButton>

        <SocialLoginContainer>
          <KakaoButton>
            <img src={require("../assets/images/kakao-logo.png")} />
          </KakaoButton>
          <GoogleButton>
            <img src={require("../assets/images/google-logo.png")}/>
          </GoogleButton>
        </SocialLoginContainer>

        <FooterButtons>
          <button>회원가입</button>
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
        </FooterButtons>
      </ModalContainer>
    </ModalBackground>
  );
};


export default LoginModal;
