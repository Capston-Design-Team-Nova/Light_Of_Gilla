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
//width: 100%;

export const Main = styled.main`
  width: 100%;
  height: 100%;
`;

export const TopRow = styled.div`
    display: flex;  // This makes it a flex container
    align-items: center;  // Align vertically in the center
    gap: 200px;  // Space between the SelectBox and Button
    margin-bottom: 20px;  // Optional: Add space below the row
`;

export const Content = styled.div`
  width: 90%;
  height: 100%; /* 높이를 명시적으로 설정 */
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬: 중앙 */
  align-items: center; /* 세로 정렬: 중앙 */
  padding-top: 80px; /* PageHeader의 높이에 맞는 여백 추가 */
  border-radius: 8px;
  background-color: white;
  `;

export const Button = styled.button`
  padding: 2px;
  width: 50px;
  height: 25px;
  background-color: #F8C743;
  color: white;
  font-family: 'OurFont1';
  font-size: 12px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

export const TitleInput = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 11px;
  margin-bottom: 20px;
  border: 1px solid #00000059;
  border-radius: 5px;
`;

export const ContentTextArea = styled.textarea`
  width: 90%;
  height: 250px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #00000059;
  border-radius: 5px;
  resize: none;
`;

export const LowRow = styled.div`
    display: flex;  // This makes it a flex container
    align-items: center;  // Align vertically in the center
    gap: 700px;  // Space between the SelectBox and Button
    margin-bottom: 10px;  // Optional: Add space below the row
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


