import React, { useState,useEffect } from "react";
import axios from "axios";
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
} from "../../styles/LoginStyles";

const LoginModal = ({ onClose, onSwitch }) => {
  const [emailOrUserId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/login", {
        emailOrUserId: emailOrUserId,
        password,
      });
      localStorage.setItem("Email",emailOrUserId);
      localStorage.setItem("token", res.data.token); // JWT 저장
      alert("로그인 성공!");
      await getNickName();
      onClose();
    } catch (error) {
      console.error(error);
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };
  const getNickName = async () => {
    const Email = localStorage.getItem("Email");
    console.log("Email:", Email);
  
    try {
      const response = await axios.get(`http://localhost:8082/post/getNickName?value=${Email}`);
      console.log("닉네임 데이터를 불러오는 중");
      localStorage.setItem("nickname", response.data);
      console.log("nickname", response.data);
    } catch (error) {
      console.error("사용자가 없음:", error);
    }
  };
  

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>GILLA</Title>
        <InputField
          type="text"
          placeholder="이메일 입력"
          value={emailOrUserId}
          onChange={(e) => setEmailOrId(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>

        <SocialLoginContainer>
          <KakaoButton>
            <img src={require("../../assets/images/kakao-logo.png")} />
          </KakaoButton>
          <GoogleButton>
            <img src={require("../../assets/images/google-logo.png")} />
          </GoogleButton>
        </SocialLoginContainer>

        <FooterButtons>
          <button onClick={() => onSwitch("signup")}>회원가입</button>
          <button onClick={() => onSwitch("findId")}>아이디 찾기</button>
          <button onClick={() => onSwitch("findPassword")}>비밀번호 찾기</button>
        </FooterButtons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;
