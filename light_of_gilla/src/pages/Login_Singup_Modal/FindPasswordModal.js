import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputField,
  InputWithButtonWrapper,
  InlineButton,
  CodeInput,
  TimerText,
  ConfirmButton,
  SideButton,
} from "../../styles/FindPasswordStyles";

const FindPasswordModal = ({ onClose, onSwitch }) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [error, setError] = useState("");

  // Step 1: 아이디 확인 -> 이메일 조회 + 인증 코드 발송
  const handleIdCheck = async () => {
    setError("");
    if (!userId) {
      setError("아이디를 입력하세요.");
      return;
    }
    try {
      const res = await axios.get(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}`
      );
      const userEmail = res.data.email;
      setEmail(userEmail);

      await axios.post(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/send-verification-email`,
        { email: userEmail }
      );

      setTimeLeft(300);
      setTimerActive(true);
      setStep(2);
    } catch {
      setError("존재하지 않는 아이디입니다.");
    }
  };

  // Step 2: 코드 검증
  const handleVerifyCode = async () => {
    setError("");
    if (!code) {
      setError("코드를 입력하세요.");
      return;
    }
    try {
      await axios.post(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/verify-email`,
        { email, code }
      );

      setVerified(true); // 인증 성공만 처리
    } catch {
      setError("인증 코드가 유효하지 않습니다.");
    }
  };

  // 타이머
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timeLeft]);

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>

        {step === 1 && (
          <>
            <Title>아이디를 입력해주세요</Title>
            <InputWithButtonWrapper>
              <InputField
                type="text"
                placeholder="아이디 입력"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </InputWithButtonWrapper>
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <ConfirmButton onClick={handleIdCheck}>다음</ConfirmButton>
          </>
        )}

        {step === 2 && (
          <>
            <Title>
              <strong>{email}</strong>로<br />
              인증코드가 전송되었습니다.
            </Title>

            <InputWithButtonWrapper style={{ position: "relative" }}>
              <CodeInput
                type="text"
                placeholder="코드 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={timeLeft === 0 || verified}
                style={{ paddingRight: "60px" }}
              />
              <TimerText>
                {`${String(Math.floor(timeLeft / 60)).padStart(
                  2,
                  "0"
                )}:${String(timeLeft % 60).padStart(2, "0")}`}
              </TimerText>
              <InlineButton
                onClick={handleVerifyCode}
                disabled={timeLeft === 0 || verified}
              >
                확인
              </InlineButton>
            </InputWithButtonWrapper>

            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

            {verified && (
              <p style={{ color: "green", fontSize: 13 }}>
                인증에 성공했습니다.
              </p>
            )}

            <ConfirmButton
              onClick={async () => {
                try {
                  await axios.post(
                    `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/reset-password`,
                    { email }
                  );
                  setStep(3);
                } catch {
                  setError("임시 비밀번호 발송 중 오류가 발생했습니다.");
                }
              }}
              disabled={!verified}
            >
              다음
            </ConfirmButton>
          </>
        )}

        {step === 3 && (
          <>
            <Title>
              임시 비밀번호가 이메일로
              <br />
              전송되었습니다.
            </Title>
            <ConfirmButton onClick={() => onSwitch("login")}>로그인 하기</ConfirmButton>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default FindPasswordModal;
