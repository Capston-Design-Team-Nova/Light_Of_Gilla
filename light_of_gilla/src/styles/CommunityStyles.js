import styled from 'styled-components';


export const Center = styled.div`
  width: 100%;
  height: 75vh; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 80px; /* PageHeader의 높이에 맞는 여백 추가 */
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;


export const P = styled.h1`
  width: 70vw;
  text-align: center;
  font-size: 10vw;
  color: #black;
  font-family: 'OurFont2';
  margin-top: 30px; /* 컨테이너 상단 여백 */
`;



