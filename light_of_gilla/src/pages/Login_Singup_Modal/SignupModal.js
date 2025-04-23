import React, { useState } from "react";
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
} from "../../styles/SignupStyles";

const SignupModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
    profileImage: "",
    residentNumber: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.userId || !formData.password || !formData.email) {
        alert("필수 정보를 입력해주세요.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
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
        phone: "01000000000", // 임시
        nickname: formData.nickname,
        profileImage:
          profilePreview || "https://example.com/default-profile.jpg",
        residentNumber: formData.residentNumber
          .replace(/[^0-9]/g, "")
          .slice(2, 8), // 19990127 → 990127
      };

      console.log("회원가입 요청 payload:", payload);
      const EmailandName={
        email: formData.email,
        userid: formData.userId,
        nickName: formData.nickname
      }
      console.log("회원가입 요청 EmailandName:", EmailandName);
      const call = await axios.post(
        "http://localhost:8082/post/signup",
        EmailandName
      );
      const response = await axios.post(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/signup",
        payload
      );

      alert("회원가입이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error("회원가입 오류:", error.response || error);
      alert(
        error.response?.data?.message ||
          "회원가입에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title>회원가입을 진행합니다</Title>
            <InputField
              type="text"
              placeholder="아이디 입력"
              value={formData.userId}
              onChange={(e) => updateField("userId", e.target.value)}
            />
            <InputField
              type="password"
              placeholder="비밀번호(영문, 숫자, 특수문자)"
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
              <EmailInput
                type="email"
                placeholder="이메일 입력"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <EmailButton disabled>인증</EmailButton>
            </EmailRow>

            <InputField type="text" placeholder="확인코드 입력 (생략됨)" disabled />
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
        {renderStep()}
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupModal;
