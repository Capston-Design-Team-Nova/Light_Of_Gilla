import styled from 'styled-components';

export const PageHeader = styled.header`
  width: 100%;
  background-color: #FBD697;
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  position: fixed; /* 상단에 고정 */
  top: 0; /* 화면 상단에 위치 */
  left: 0; /* 화면 왼쪽에 위치 */
`;



export const Nav = styled.nav`
  width: 98%;
  display: flex; /* Flexbox 활성화 */
  justify-content: 'flex-start'/*좌측 정렬*/
  align-items: center; /* 세로 방향으로 중앙 정렬 */
`;

export const Button = styled.button`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #FBD697;
  color: white;
  font-size: 2vw;
  font-family: 'OurFont2';
  cursor: pointer;
  border: none;
`;