import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputField,
  NextButton,
  EmailRow,
  EmailInput,
  EmailButton,
  TimerInput,
  TimerText,
} from "../../styles/SignupStyles";

import backIcon from "../../assets/images/뒤로가기.png";

const SignupModal = ({ onClose, onSwitch }) => {
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userIdAvailable, setUserIdAvailable] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [checkingId, setCheckingId] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
    profileImage: "",
    residentNumber: "",
  });

  const [formDataState, setFormDataState] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
    profileImage: "", // 사용 안함
    residentNumber: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckUserId = async () => {
    if (!formData.userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    setCheckingId(true);
    try {
      const res = await axios.get(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${formData.userId}`
      );
      setUserIdAvailable(false);
      alert("이미 사용 중인 아이디입니다.");
    } catch (err) {
      setUserIdAvailable(true);
      alert("사용 가능한 아이디입니다.");
    } finally {
      setCheckingId(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (emailSending) return;
    setEmailSending(true);

    try {
      await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/send-verification-email",
        { email: formData.email }
      );
      alert("인증 이메일이 전송되었습니다. 메일함을 확인하세요.");
      setTimerActive(true);
      setTimeLeft(300);
      setVerificationCode("");
    } catch (err) {
      alert("인증 이메일 전송 실패");
    } finally {
      setEmailSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verifyingCode) return;
    setVerifyingCode(true);

    try {
      await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/verify-email",
        { email: formData.email, code: verificationCode }
      );
      setEmailVerified(true);
      alert("이메일 인증 완료");
    } catch (err) {
      alert("인증 코드가 올바르지 않습니다");
    } finally {
      setVerifyingCode(false);
    }
  };

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleNext = () => {
    if (step === 1) {
      const password = formData.password;

      // 비밀번호 형식 검사
      const pwValid =
        /[A-Za-z]/.test(password) && // 영문
        /[0-9]/.test(password) && // 숫자
        /[^A-Za-z0-9]/.test(password) && // 특수문자
        password.length >= 8;

      if (!formData.userId || !formData.password || !formData.email) {
        alert("필수 정보를 입력해주세요.");
        return;
      }

      if (!pwValid) {
        alert(
          "비밀번호는 8자 이상이며, 영문/숫자/특수문자를 모두 포함해야 합니다."
        );
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (!emailVerified) {
        alert("이메일 인증을 완료해주세요.");
        return;
      }

      if (!userIdAvailable) {
        alert("아이디 중복 확인을 해주세요.");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async () => {
    try {
      const payload = {
        userId: formData.userId,
        password: formData.password,
        email: formData.email,
        phone: "01000000000",
        nickname: formData.nickname,
        profileImage: "https://example.com/default-profile.jpg", // 디폴트
        residentNumber: formData.residentNumber
          .replace(/[^0-9]/g, "")
          .slice(2, 8),
      };

      await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/signup",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const loginRes = await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/login",
        {
          emailOrUserId: formData.userId,
          password: formData.password,
        }
      );
      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      if (profileImageFile) {
        const formDataImage = new FormData();
        formDataImage.append("profileImage", profileImageFile);

        await axios.patch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${formData.userId}/profile-image`,
          formDataImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("회원가입 및 프로필 사진 등록이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error(
        "회원가입 또는 프로필 업데이트 오류:",
        error.response || error
      );
      alert(
        error.response?.data?.message ||
          "회원가입 또는 프로필 설정 중 오류가 발생했습니다."
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title>회원가입을 진행합니다</Title>
            <EmailRow>
              <TimerInput>
                <EmailInput
                  type="text"
                  placeholder="아이디 입력"
                  value={formData.userId}
                  onChange={(e) => updateField("userId", e.target.value)}
                />
              </TimerInput>
              <EmailButton onClick={handleCheckUserId} disabled={checkingId}>
                {checkingId ? "확인 중" : "중복확인"}
              </EmailButton>
            </EmailRow>

            <InputField
              type="password"
              placeholder="비밀번호(영문, 숫자, 특수문자) 8자리 이상"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
            <InputField
              type="password"
              placeholder="비밀번호 재입력"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
            />

            <EmailRow>
              <TimerInput>
                <EmailInput
                  type="email"
                  placeholder="이메일 입력"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </TimerInput>
              <EmailButton
                onClick={handleSendVerificationEmail}
                disabled={emailSending}
              >
                {emailSending ? "전송 중" : "인증"}
              </EmailButton>
            </EmailRow>

            <EmailRow>
              <TimerInput>
                <EmailInput
                  type="text"
                  placeholder="확인코드 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={timeLeft === 0 || emailVerified}
                />
                {timerActive && (
                  <TimerText>
                    {`${String(Math.floor(timeLeft / 60)).padStart(
                      2,
                      "0"
                    )}:${String(timeLeft % 60).padStart(2, "0")}`}
                  </TimerText>
                )}
              </TimerInput>
              <EmailButton
                onClick={handleVerifyCode}
                disabled={verifyingCode || emailVerified || timeLeft === 0}
              >
                {verifyingCode ? "확인 중" : "확인"}
              </EmailButton>
            </EmailRow>

            <NextButton onClick={handleNext}>다음</NextButton>
          </>
        );

      case 2:
        return (
          <>
            <Title>사진과 이름을 등록해주세요</Title>
            <div style={{ margin: "20px 0", textAlign: "center" }}>
              <label htmlFor="profileUpload">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#eee",
                    margin: "0 auto 15px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      alt="프로필"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <InputField
              type="text"
              placeholder="이름(닉네임) 입력"
              value={formData.nickname}
              onChange={(e) => updateField("nickname", e.target.value)}
            />
            <NextButton onClick={handleNext}>다음</NextButton>
          </>
        );

      case 3:
        return (
          <>
            <Title>생년월일을 입력하세요.</Title>
            <InputField
              type="text"
              placeholder="예: 19990127"
              value={formData.residentNumber}
              onChange={(e) => updateField("residentNumber", e.target.value)}
            />
            <NextButton onClick={handleSignup}>회원가입</NextButton>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>

        <img
          src={backIcon}
          alt="뒤로가기"
          onClick={() => {
            if (step === 1) {
              onSwitch("login");
            } else {
              setStep((prev) => prev - 1);
            }
          }}
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

        {renderStep()}
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupModal;
