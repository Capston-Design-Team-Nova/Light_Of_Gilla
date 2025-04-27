import styled from "styled-components";

const mobile = '@media screen and (max-width: 480px)';

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  background-color: white;
  
  ${mobile} {
    padding-bottom: 50px;
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
  cursor: pointer; /* ✅ 커서가 손모양으로 */
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
  margin: 0; /* ✅ 위아래 여백 제거 */
`;

export const Birthday = styled.h4`
  font-family: Ourfont4;
  font-size: 18px;
  margin: 5px 0 0 0; /* ✅ 위에만 약간 여백 */
`;


export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 450px; /* ✅ 전체 라인 길이를 고정해줌 */

  ${mobile} {
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
  }
`;

export const Label = styled.label`
  font-family: Ourfont4;
  width: 150px; /* ✅ 라벨의 고정 너비 */
  font-size: 18px;
  flex-shrink: 0; /* ✅ 줄어들지 않게 고정 */
`;

export const Input = styled.input`
  
  height: 36px;
  padding: 5px 10px;
  font-size: 16px;
  margin-right: 10px;

  ${mobile} {
    width: 100%;
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

export const ErrorMessage = styled.div`
  width: 400px;
  font-size: 14px;
  color: #ff6b00; /* 약간 주황빛 나는 색 */
  margin-top: -10px;
  margin-bottom: 10px;
  margin-left: 250px;
  font-family: Ourfont4;

  @media screen and (max-width: 480px) {
    width: 90%;
  }
`;

export const SuccessMessage = styled.div`
  width: 400px;
  font-size: 14px;
  color: green;
  margin-top: -10px;
  margin-bottom: 10px;
  font-family: Ourfont4;

  @media screen and (max-width: 480px) {
    width: 90%;
  }
`;