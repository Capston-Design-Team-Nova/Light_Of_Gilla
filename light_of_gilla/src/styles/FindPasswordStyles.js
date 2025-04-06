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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
  line-height: 1.4;
`;

export const InputField = styled.input`
  width: 80%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
`;

export const VerifyButton = styled.button`
  width: 87%;
  padding: 12px;
  margin-top: 15px;
  background-color: #f5a26f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

export const LeftButton = styled.button`
  padding: 10px 20px;
  background-color: #f9d8a1;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
`;

export const RightButton = styled.button`
  padding: 10px 20px;
  background-color: #f5a26f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
`;

export const InlineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 12px auto;
`;

export const CodeInput = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  outline: none;
`;

export const InlineButton = styled.button`
  margin-left: 8px;
  padding: 10px 16px;
  font-size: 14px;
  background-color: #f9d8a1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const NextButton = styled.button`
  width: 80%;
  padding: 12px;
  margin: 25px auto 0;
  background-color: #f5a26f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: block;
`;
