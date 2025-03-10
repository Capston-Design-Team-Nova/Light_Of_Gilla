import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: "OurFont2";
`;

export const InputField = styled.input`
  width: 80%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const LoginButton = styled.button`
  width: 87%;
  padding: 12px;
  margin-top: 10px;
  background-color: #f5a26f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

export const SocialLoginContainer = styled.div`
  width: 90%;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  margin-left: 20px;
`;

export const KakaoButton = styled.button`
  width: 48%;
  height: 50px;
  border: none;
  background-color: #fae100;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  img {
    width: 30%;
    height: 90%;
  }
`;

export const GoogleButton = styled.button`
  width: 45%;
  height: 50px;
  border: none;
  background-color: rgb(233, 233, 233);
  cursor: pointer;
  margin-left: 7px;
  border-radius: 5px;
  img {
    width: 30%;
    height: 90%;
  }
`;

export const FooterButtons = styled.div`
  justify-content: space-between;
  margin-top: 15px;
  margin-right: 8px;

  button {
    background: rgb(255, 220, 160);
    border: none;
    padding: 8px;
    width: 28%;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
  }
`;
