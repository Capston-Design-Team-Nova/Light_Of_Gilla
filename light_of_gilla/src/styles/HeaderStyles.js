import styled from 'styled-components';

export const PageHeader = styled.header`
  width: 100%;
  background-color: #FFC86A;
  display: flex; /* Flexbox 활성화 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  position: fixed; /* 상단에 고정 */
  top: 0; /* 화면 상단에 위치 */
  left: 0; /* 화면 왼쪽에 위치 */
  z-index: 1000;
`;

export const Nav = styled.nav`
  width: 99%;
  display: flex; /* Flexbox 활성화 */
  justify-content: flex-end;/*우측 정렬*/
  align-items: center; /* 세로 방향으로 중앙 정렬 */
`;

export const NavRight = styled.nav`
  width: 96%;
  display: flex; /* Flexbox 활성화 */
  justify-content: flex-end; /* 우측 정렬 */
  align-items: center; /* 세로 방향으로 중앙 정렬 */
`;

export const Button = styled.button`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #FFC86A;
  color: black;
  font-family: 'OurFont1';
  font-weight: bold;
  font-size: 1.3vw;
  cursor: pointer;
  border: none;
`;

export const ImageButton1 = styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:2px; 

  img {
    width: 95px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 55px; /* 비율에 맞게 높이 자동 조정 */
    
  }
`;

export const ImageButton2 = styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:2px; 

  img {
    width: 45px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 40px; /* 비율에 맞게 높이 자동 조정 */
    
  }
`;