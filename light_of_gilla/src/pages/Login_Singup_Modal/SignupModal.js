import React, { useState } from "react";
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

  const handleNext = () => setStep((prev) => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title>회원가입을 진행합니다</Title>
            <InputField type="text" placeholder="아이디 입력" />
            <InputField
              type="password"
              placeholder="비밀번호(영문, 숫자, 특수문자)"
            />
            <InputField type="password" placeholder="비밀번호 재입력" />

            <EmailRow>
              <EmailInput type="email" placeholder="이메일 입력" />
              <EmailButton>인증</EmailButton>
            </EmailRow>

            <InputField type="text" placeholder="확인코드 입력" />
            <NextButton onClick={handleNext}>다음</NextButton>
          </>
        );
      case 2:
        return (
          <>
            <Title>사진과 이름을 등록해주세요</Title>
            <div style={{ margin: "20px 0" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#eee",
                  margin: "0 auto 15px",
                }}
              />
            </div>
            <InputField type="text" placeholder="이름(닉네임) 입력" />
            <NextButton onClick={handleNext}>다음</NextButton>
          </>
        );
      case 3:
        return (
          <>
            <Title>생년월일을 입력하세요.</Title>
            <InputField type="text" placeholder="예: 1999년 01월 27일" />
            <NextButton onClick={() => alert("회원가입 완료!")}>
              회원가입
            </NextButton>
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
