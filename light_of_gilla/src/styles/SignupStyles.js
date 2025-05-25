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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
  line-height: 1.4;
`;

export const InputField = styled.input`
  width: 80%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  outline: none;
`;

export const NextButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
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

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px auto;
  width: 86%;
  position: relative;
`;

export const EmailInput = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  outline: none;
`;

export const EmailButton = styled.button`
  min-width: 79px;
  padding: 10px 14px;
  background-color: #f9d8a1;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 5px;

  &:hover {
    background: #f0c98b;
  }
`;

export const TimerInput = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

export const TimerText = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: #999;
`;
