import React, { useState } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputField,
  ConfirmButton,
} from "../../styles/FindIdStyles";

const FindIdModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {step === 1 && (
          <>
            <Title>이메일을 입력해주세요</Title>
            <InputField
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ConfirmButton onClick={handleNext}>다음</ConfirmButton>
          </>
        )}
        {step === 2 && (
          <>
            <Title>아이디가 이메일로<br />발송되었습니다.</Title>
            <ConfirmButton onClick={onClose}>로그인 하기</ConfirmButton>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default FindIdModal;
