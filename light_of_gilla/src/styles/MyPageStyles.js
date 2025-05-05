import styled from "styled-components";

const mobile = '@media screen and (max-width: 480px)';

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Center = styled.div`
  width: 100%;
  min-height: 100vh; /* 높이 고정 대신 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 120px; /* 하단 패딩 늘려서 버튼 공간 확보 */

  background-color: white;

  ${mobile} {
    padding: 50px 0 150px; /* 모바일에서는 여유 더 주기 */
  }
`;

export const Title = styled.h2`
  font-family: Ourfont4;
  font-size: 36px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ProfileImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px 0;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const UserEmail = styled.h4`
  font-family: Ourfont4;
  font-size: 20px;
  margin: 0;
`;

export const Birthday = styled.h4`
  font-family: Ourfont4;
  font-size: 18px;
  margin: 5px 0 0 0;
`;





export const ReviewButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: rgb(255, 221, 161);
  border: none;
  border-radius: 6px;
  cursor: pointer;

  ${mobile} {
    width: 90%;
    margin-top: 5px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
  width: 90%;
  margin-bottom: 0.3rem;
  margin-left: 2.5rem;

  ${mobile} {
    justify-content: center;
    margin-left: 0;
    padding: 0 1rem;
  }
`;

export const ReviewButtonRow = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin-top: -3px;
  margin-bottom: 10px;
  margin-right: 1.5rem;

  ${mobile} {
    justify-content: center;
    margin-right: 0;
    padding: 0 1rem;
  }
`;



export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 450px;

  ${mobile} {
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
  }
`;

export const Label = styled.label`
  font-family: Ourfont4;
  width: 150px;
  font-size: 18px;
  flex-shrink: 0;

  ${mobile} {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const Input = styled.input`
  width: calc(100% - 160px);  /* 기본 넓이 조절 */
  height: 36px;
  padding: 5px 10px;
  font-size: 16px;
  margin-right: 10px;

  ${mobile} {
    width: 90%;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  width: 180px;
  height: 43px;
  padding: 7px 20px;
  background-color: white;
  color: black;
  font-size: 14px;
  border: solid black 0.1rem;
  border-radius: 5px;
  cursor: pointer;

  ${mobile} {
    width: 100%;
    margin-top: 5px;
  }
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  margin-bottom: 50px;
  width: 180px;
  padding: 7px 20px;
  background-color: white;
  color: black;
  font-family: 'OurFont2';
  font-size: 18px;
  cursor: pointer;
  border: solid black 0.1rem;
  border-radius: 8px;

  ${mobile} {
    width: 90%;
  }
`;

export const WithdrawButton = styled(SaveButton)`
  background-color: rgb(248, 131, 89);
`;

export const ErrorMessage = styled.div`
  width: 400px;
  font-size: 14px;
  color: #ff6b00;
  margin-top: -10px;
  margin-bottom: 10px;
  font-family: Ourfont4;

  ${mobile} {
    width: 90%;
  }
`;

export const SuccessMessage = styled(ErrorMessage)`
  color: green;
`;
