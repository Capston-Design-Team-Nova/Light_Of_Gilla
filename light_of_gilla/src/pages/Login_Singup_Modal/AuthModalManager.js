import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import FindIdModal from "./FindIdModal";
import FindPasswordModal from "./FindPasswordModal";

const AuthModalManager = ({ onCloseAll }) => {
  const [modalType, setModalType] = useState("login");

  const handleClose = () => {
    setModalType("login");
    onCloseAll(); // 전체 모달 닫기
  };

  switch (modalType) {
    case "login":
      return <LoginModal onSwitch={setModalType} onClose={handleClose} />;
    case "signup":
      return <SignupModal onSwitch={setModalType} onClose={handleClose}  />;
    case "findId":
      return <FindIdModal onSwitch={setModalType} onClose={handleClose} />;
    case "findPassword":
      return <FindPasswordModal onSwitch={setModalType} onClose={handleClose} />;
    default:
      return null;
  }
};

export default AuthModalManager;
