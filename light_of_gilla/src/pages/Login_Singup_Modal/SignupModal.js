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
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [nicknameAvailable, setNicknameAvailable] = useState(null);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [phoneAvailable, setPhoneAvailable] = useState(null);

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    letter: false,
    number: false,
    special: false,
  });

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
    profileImage: "",
    residentNumber: "",
    phone: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (value) => {
    updateField("password", value);
    setPasswordValid({
      length: value.length >= 8,
      letter: /[A-Za-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    });
  };

  const handleCheckUserId = async () => {
    if (!formData.userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    setCheckingId(true);
    try {
      await axios.get(
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
      // 1. 이메일 존재 여부 확인
      await axios.get(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/email/${formData.email}`
      );

      // 2. 존재하면 사용 중이므로 중단
      setEmailAvailable(false);
      alert("이미 사용 중인 이메일입니다.");
    } catch (err) {
      setEmailAvailable(true);
      try {
        await axios.post(
          "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/send-verification-email",
          { email: formData.email }
        );
        alert("인증 이메일이 전송되었습니다. 메일함을 확인하세요.");
        setTimerActive(true);
        setTimeLeft(300);
        setVerificationCode("");
      } catch {
        alert("인증 이메일 전송 실패");
      }
    } finally {
      setEmailSending(false);
    }
  };

  const checkPhoneAvailability = async () => {
    if (!formData.phone) {
      setPhoneAvailable(null);
      return;
    }

    try {
      const res = await axios.get(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users"
      );
      const exists = res.data.some((u) => u.phone === formData.phone);
      setPhoneAvailable(!exists);
    } catch (err) {
      console.error("전화번호 중복 확인 실패:", err);
      setPhoneAvailable(null);
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
      const pwValid =
        passwordValid.length &&
        passwordValid.letter &&
        passwordValid.number &&
        passwordValid.special;

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

      if (phoneAvailable === false) {
        alert("이미 사용 중인 전화번호입니다.");
        return;
      }

      if (phoneAvailable === null) {
        alert("전화번호 중복 확인이 필요합니다.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.nickname) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      if (nicknameAvailable === false) {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }

      if (nicknameAvailable === null) {
        alert("닉네임 중복 확인이 필요합니다.");
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

  const checkNicknameAvailability = async () => {
    setNicknameTouched(true);

    if (!formData.nickname) {
      setNicknameAvailable(null);
      return;
    }

    try {
      const res = await axios.get(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/search?nickname=${encodeURIComponent(
          formData.nickname
        )}`
      );

      console.log("닉네임 확인 응답:", res.data);

      const dataArray = Object.values(res.data);

      // 정확히 일치하는 닉네임이 있는지만 검사
      const isUsed = dataArray.some(
        (user) => user.nickname === formData.nickname
      );

      setNicknameAvailable(!isUsed);
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      setNicknameAvailable(null);
    }
  };

  const handleSignup = async () => {
    const payload = {
      userId: formData.userId,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      nickname: formData.nickname,
      profileImage: "https://example.com/default-profile.jpg",
      residentNumber: formData.residentNumber
        .replace(/[^0-9]/g, "")
        .slice(2, 8),
    };
    try {
      await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/signup",
        payload
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
      console.log("회원가입 전송 payload:", payload);
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

  const handleUserIdChange = (e) => {
    const input = e.target.value;
    const noKorean = input.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    updateField("userId", noKorean);
    setUserIdAvailable(null); // 아이디 변경 시 사용 가능 상태 초기화
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title>회원가입을 진행합니다</Title>
            <EmailRow style={{ position: "relative", width: "86%" }}>
              <TimerInput style={{ position: "relative", width: "100%" }}>
                <EmailInput
                  type="text"
                  placeholder="아이디 입력 (한글 제외)"
                  value={formData.userId}
                  onChange={handleUserIdChange}
                  style={{ paddingRight: "30px" }} // 아이콘 공간 확보
                />
                {userIdAvailable && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "green",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
              </TimerInput>

              <EmailButton onClick={handleCheckUserId} disabled={checkingId}>
                {checkingId ? "확인 중" : "중복확인"}
              </EmailButton>
            </EmailRow>

            <EmailRow style={{ position: "relative", width: "86%" }}>
              <TimerInput style={{ position: "relative", width: "100%" }}>
                <EmailInput
                  type="password"
                  placeholder="비밀번호 (영문/숫자/특수문자 포함, 8자 이상)"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  style={{ paddingRight: "30px" }}
                />

                {passwordTouched &&
                  passwordValid.length &&
                  passwordValid.letter &&
                  passwordValid.number &&
                  passwordValid.special && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "green",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                  )}
              </TimerInput>
            </EmailRow>
            {passwordTouched &&
              (!passwordValid.length ||
                !passwordValid.letter ||
                !passwordValid.number ||
                !passwordValid.special) && (
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    textAlign: "left",
                    marginLeft: "10%",
                  }}
                >
                  <div
                    style={{ color: passwordValid.length ? "green" : "red" }}
                  >
                    • 8자 이상
                  </div>
                  <div
                    style={{ color: passwordValid.letter ? "green" : "red" }}
                  >
                    • 영문 포함
                  </div>
                  <div
                    style={{ color: passwordValid.number ? "green" : "red" }}
                  >
                    • 숫자 포함
                  </div>
                  <div
                    style={{ color: passwordValid.special ? "green" : "red" }}
                  >
                    • 특수문자 포함
                  </div>
                </div>
              )}

            <EmailRow style={{ position: "relative", width: "86%" }}>
              <TimerInput style={{ position: "relative", width: "100%" }}>
                <EmailInput
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  onBlur={() => setConfirmTouched(true)}
                  style={{ paddingRight: "30px" }}
                />

                {/* 일치 체크 아이콘 */}
                {confirmTouched &&
                  formData.confirmPassword &&
                  formData.confirmPassword === formData.password && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "green",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                  )}

                {/* 불일치 X 아이콘 */}
                {confirmTouched &&
                  formData.confirmPassword &&
                  formData.confirmPassword !== formData.password && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      ✕
                    </span>
                  )}
              </TimerInput>
            </EmailRow>
            {confirmTouched &&
              formData.confirmPassword !== formData.password && (
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    color: "red",
                    textAlign: "left",
                    marginLeft: "10%",
                  }}
                >
                  • 비밀번호가 일치하지 않습니다.
                </div>
              )}

            <EmailRow style={{ position: "relative", width: "86%" }}>
              <TimerInput style={{ position: "relative", width: "100%" }}>
                <EmailInput
                  type="tel"
                  placeholder="전화번호 입력 (예: 01012345678)"
                  value={formData.phone}
                  onChange={(e) => {
                    updateField("phone", e.target.value);
                    setPhoneAvailable(null); // 입력 중 상태 초기화
                  }}
                  onBlur={checkPhoneAvailability}
                  style={{ paddingRight: "30px" }} // 아이콘 공간 확보
                />

                {formData.phone && phoneAvailable === true && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "green",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}

                {formData.phone && phoneAvailable === false && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "red",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ✕
                  </span>
                )}
              </TimerInput>
            </EmailRow>
            {formData.phone && phoneAvailable === false && (
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "red",
                  textAlign: "left",
                  marginLeft: "10%",
                }}
              >
                • 이미 사용 중인 전화번호입니다.
              </div>
            )}

            <EmailRow style={{ position: "relative", width: "86%" }}>
              <TimerInput style={{ position: "relative", width: "100%" }}>
                <EmailInput
                  type="email"
                  placeholder="이메일 입력"
                  value={formData.email}
                  onChange={(e) => {
                    updateField("email", e.target.value);
                    setEmailAvailable(null); // 이메일 변경 시 상태 초기화
                  }}
                  style={{ paddingRight: "30px" }}
                />
                {emailAvailable === true && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "green",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>
                )}
                {emailAvailable === false && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "red",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ✕
                  </span>
                )}
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
            <div style={{ position: "relative", width: "100%" }}>
              <EmailRow style={{ position: "relative", width: "100%" }}>
                <TimerInput style={{ position: "relative", width: "100%" }}>
                  <EmailInput
                    type="text"
                    placeholder="이름(닉네임) 입력"
                    value={formData.nickname}
                    onChange={(e) => {
                      updateField("nickname", e.target.value);
                      setNicknameAvailable(null); // 입력 중에는 상태 초기화
                    }}
                    onBlur={() => setNicknameTouched(true)}
                    style={{ paddingRight: "30px" }}
                  />
                  {nicknameAvailable === true && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "green",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                  )}
                  {nicknameAvailable === false && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </TimerInput>

                <EmailButton onClick={checkNicknameAvailability}>
                  중복확인
                </EmailButton>
              </EmailRow>
            </div>
            {nicknameTouched && nicknameAvailable === false && (
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "red",
                  textAlign: "left",
                }}
              >
                이미 사용 중인 닉네임입니다.
              </div>
            )}

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
