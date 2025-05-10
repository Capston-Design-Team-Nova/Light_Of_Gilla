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
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }
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

  &:hover {
    background-color: #e59260;
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
    &:hover {
      background: #f0c98b;
    }
  }
`;
