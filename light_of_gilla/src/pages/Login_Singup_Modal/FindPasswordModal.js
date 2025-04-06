import React, { useState } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  Title,
  InputField,
  InlineRow,
  CodeInput,
  InlineButton,
  NextButton,
  VerifyButton,
} from "../../styles/FindPasswordStyles";

const FindPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {step === 1 && (
          <>
            <Title>아이디를 입력해주세요</Title>
            <InputField type="text" placeholder="아이디 입력" />
            <VerifyButton onClick={handleNext}>다음</VerifyButton>
          </>
        )}
        {step === 2 && (
          <>
            <Title>
              john***@example.com 에<br /> 전송된 코드를 입력해주세요.
            </Title>

            <InlineRow>
              <CodeInput
                type="text"
                placeholder="코드 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <InlineButton>확인</InlineButton>
            </InlineRow>
            <NextButton onClick={handleNext}>다음</NextButton>
          </>
        )}
        {step === 3 && (
          <>
            <Title>
              비밀번호가 이메일로
              <br />
              발송되었습니다.
            </Title>
            <VerifyButton onClick={onClose}>로그인 하기</VerifyButton>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default FindPasswordModal;
