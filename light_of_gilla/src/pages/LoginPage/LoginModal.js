import React from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
} from "../../styles/LoginStyles";

const LoginModal = ({ onClose }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        {/* 닫기 버튼 클릭 시 onClose 함수 실행 */}
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>로그인</h2>
        <button>카카오로 시작하기</button><br></br>
        <button>네이버로 시작하기</button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;
