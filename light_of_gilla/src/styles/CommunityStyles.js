import styled from 'styled-components';

export const Center = styled.div`
  width: 100%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  background-position: center; /* 중앙에 위치 */
  padding-top: 90px; /* PageHeader의 높이에 맞는 여백 추가 */
  background-color: #FEF7FF;/*#ffece3;*/
`;
//width: 100%;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: #FEF7FF;/*#ffece3;*/
`;

// CommunityStyles.js

export const TopRow = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(97% - 250px)" : "80%")};
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(97% - 250px)" : "80%")};
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  height: 500px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  border-radius: 15px;
  background-color: white;
`;


export const Button = styled.button`
  padding: 2px;
  width: 85px;
  height: 34px;
  background-color: #F8C743;
  color: white;
  font-family: 'OurFont1';
  font-size: 16px;
  font-weight:bold;
  cursor: pointer;
  border: none;
  border-radius: 8px;
`;

export const ToggleButton =styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:1px;
  position: absolute;
  left: 1px; 
  top: 60px;
  z-index:998;
  img {
    width: 65px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 55px; /* 비율에 맞게 높이 자동 조정 */
    
  }
`;

export const SearchBar = styled.div`
  display: flex;
  width: 27%;
  gap: 10px;
  background: #D9D9D9;
  border-radius: 20px;
  border: 1px solid #ccc;

  img {
    padding: 5px 5px;
    width: 14px;
    height:23px;
    border: none;
    color: black;
    cursor: pointer;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 90%;
  font-size: 15px;
  font-family: 'OurFont2';
  border:none;
  border-radius:20px;
  background: #D9D9D9;
`;

export const TitleInput = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;                    /* ✅ 기본 테두리 제거 */
  border-bottom: 1px solid #00000059;  /* ✅ 아래쪽 선만 표시 */
  background-color: transparent;   /* ✅ 원하면 배경 투명 */
  outline: none;                   /* ✅ 클릭했을 때 파란 테두리 제거 (선택사항) */
`;

export const ContentTextArea = styled.textarea`
  width: 90%;
  height: 300px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #00000059;
  border-radius: 2px;
  resize: none;
`;

export const LowRow = styled.div`
    display: flex;  // This makes it a flex container
    align-items: center;  // Align vertically in the center
    gap: 510px;  // Space between the SelectBox and Button
    margin-bottom: 10px;  // Optional: Add space below the row
`;
// CommunityStyles.js 등에 추가
export const FormRow = styled.div`
  display: flex;
  align-items: flex-start; 
  width: 90%;
  margin-bottom: 13px;
`;

export const Label = styled.label`
  width: 60px;
  font-size: 16px;
  font-family: 'Ourfont6';
  color: black;
  margin-right: 1px;
  padding-top: 9px; 
`;
/*
export const SelectBox = styled.div`
position: relative;
width: 200px;
padding: 8px;
border-radius: 12px;
background-color: #ffffff;
align-self: center;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
cursor: pointer;
&::before {
  content: "⌵";
  position: absolute;
  top: 1px;
  right: 8px;
  color: #49c181;
  font-size: 20px;
}
`;
export const Label = styled.label`
font-size: 14px;
margin-left: 4px;
text-align: center;
`;
export const SelectOptions = styled.ul`
position: absolute;
list-style: none;
top: 18px;
left: 0;
width: 100%;
overflow: hidden;
height: 90px;
max-height: ${(props) => (props.show ? "none" : "0")};
padding: 0;
border-radius: 8px;
background-color: #222222;
color: #fefefe;
`;
export const Option = styled.li`
font-size: 14px;
padding: 6px 8px;
transition: background-color 0.2s ease-in;
&:hover {
  background-color: #595959;
}
`;
*/


