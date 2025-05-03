import React, { useState } from "react";
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
  const [emailOrUserId, setEmailOrUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrUserId || !password) {
      alert("이메일 또는 비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/login",
        {
          emailOrUserId,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("emailOrUserId", emailOrUserId);

      // 내 정보 조회
      const userInfo = await axios.get(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { nickname } = userInfo.data;
      localStorage.setItem("nickname", nickname);

      alert("로그인 성공!");
      onClose();
      window.location.href = "/"; // 메인화면으로 강제 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: 이메일(또는 아이디)와 비밀번호를 다시 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>GILLA</Title>
        <InputField
          type="text"
          placeholder="이메일 또는 아이디 입력"
          value={emailOrUserId}
          onChange={(e) => setEmailOrUserId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <InputField
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <LoginButton onClick={handleLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </LoginButton>

        <SocialLoginContainer>
          <KakaoButton>
            <img
              src={require("../../assets/images/kakao-logo.png")}
              alt="Kakao Login"
            />
          </KakaoButton>
          <GoogleButton>
            <img
              src={require("../../assets/images/google-logo.png")}
              alt="Google Login"
            />
          </GoogleButton>
        </SocialLoginContainer>

        <FooterButtons>
          <button onClick={() => onSwitch("signup")}>회원가입</button>
          <button onClick={() => onSwitch("findId")}>아이디 찾기</button>
          <button onClick={() => onSwitch("findPassword")}>
            비밀번호 찾기
          </button>
        </FooterButtons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;
