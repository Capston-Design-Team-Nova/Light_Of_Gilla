import React, { useEffect, useState } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputWithButtonWrapper,
  InputField,
  SideButton,
  TimerInput,
  TimerText,
  ConfirmButton,
} from "../../styles/FindIdStyles";
import backIcon from "../../assets/images/뒤로가기.png";

const FindIdModal = ({ onClose, onSwitch }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [verified, setVerified] = useState(false);
  const [foundUserId, setFoundUserId] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmailVerification = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await fetch(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/send-verification-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      setTimerActive(true);
      setTimeLeft(300);
      setVerified(false);
      setCode("");

      alert("인증 메일이 전송되었습니다. 메일함을 확인하세요.");
    } catch (error) {
      alert("인증 메일 발송 실패");
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async () => {
    if (timeLeft === 0) return;
    try {
      const res = await fetch(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );
      if (res.ok) {
        setVerified(true);
        alert("인증 성공!");
      } else {
        alert("인증 코드가 유효하지 않습니다.");
      }
    } catch (error) {
      alert("인증 처리 실패");
    }
  };

  const handleNext = async () => {
    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/email/${email}`
      );
      const data = await res.json();
      setFoundUserId(data.userId);
      setStep(2);
    } catch (error) {
      alert("사용자 정보를 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    if (!timerActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive]);

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <img
          src={backIcon}
          alt="뒤로가기"
          onClick={() => onSwitch("login")}
          style={{
            position: "absolute",
            top: "18px",
            left: "18px",
            width: "24px",
            height: "24px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
        {step === 1 && (
          <>
            <Title>이메일로 가입한 아이디 찾기</Title>

            <InputWithButtonWrapper>
              <InputField
                type="email"
                placeholder="이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SideButton onClick={sendEmailVerification} disabled={isSending}>
                {isSending ? "전송 중" : "인증"}
              </SideButton>
            </InputWithButtonWrapper>

            <InputWithButtonWrapper>
              <TimerInput>
                <InputField
                  type="text"
                  placeholder="확인코드 입력"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={timeLeft === 0 || verified}
                />
                {timerActive && <TimerText>{formatTime(timeLeft)}</TimerText>}
              </TimerInput>
              <SideButton
                onClick={verifyCode}
                disabled={timeLeft === 0 || verified}
              >
                확인
              </SideButton>
            </InputWithButtonWrapper>

            <ConfirmButton onClick={handleNext} disabled={!verified}>
              다음
            </ConfirmButton>
          </>
        )}

        {step === 2 && (
          <>
            <Title>가입된 아이디는 다음과 같습니다</Title>
            <p
              style={{ fontSize: "16px", margin: "20px 0", fontWeight: "bold" }}
            >
              {foundUserId}
            </p>
            <ConfirmButton onClick={() => onSwitch("login")}>
              로그인 하기
            </ConfirmButton>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default FindIdModal;
