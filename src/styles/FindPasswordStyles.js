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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
  line-height: 1.4;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
`;

export const InputWithButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin: 12px auto;
`;

export const InlineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80%;
  margin: 12px auto;
`;

export const CodeInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
  position: relative;
`;

export const TimerText = styled.span`
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: #666;
  pointer-events: none;
`;

export const InlineButton = styled.button`
  padding: 12px;
  font-size: 14px;
  background-color: #f9d8a1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 60px;
  &:hover {
    background: #f0c98b;
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  background-color: #f5a26f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e59260;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
