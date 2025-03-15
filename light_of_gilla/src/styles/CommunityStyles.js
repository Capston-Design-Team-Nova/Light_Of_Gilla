import styled from 'styled-components';


export const Center = styled.div`
  width: 100%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 80px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color:#FEF7FF;
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 90%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  padding-top: 80px; /* PageHeader의 높이에 맞는 여백 추가 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  `;

export const Button = styled.button`
  padding: 1px ;
  width: 50px;
  height: 20px;
  background-color: #F8C743;
  color: white;
  font-family: 'OurFont1';
  font-size: 12px;
  cursor: pointer;
  border: none;
`;



export const TitleInput = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 11px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const ContentTextArea = styled.textarea`
  width: 90%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;


