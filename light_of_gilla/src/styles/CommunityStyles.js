import styled from 'styled-components';

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';


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

  ${mobile} {
    padding-bottom: 50px;
  }
`;
//width: 100%;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: #FEF7FF;/*#ffece3;*/
`;

// CommunityStyles.js

export const TopRow = styled.div`
    width: calc(97% - 250px);
    margin-left: 250px;
  transition: margin-left 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;

    ${mobile} {
    width: 90%;
    flex-direction: column;
    margin-left: 0;
    align-items: center;
     gap: 2px; /*  모바일에서 간격만 좁게 조절 */
  }
`;

export const Content = styled.div`
  position: relative; // 기준이 되는 부모
  width: calc(97% - 250px);
    margin-left: 250px;
  transition: margin-left 0.3s ease;
  min-height: 70vh; /* 내용이 너무 적을 때는 최소 높이 보장 */
  height: auto;
  background-color: white;
  border-radius: 15px;
box-shadow: 0 2px 4px rgba(124, 124, 124, 0.3),   /* 아래 */
    0 -2px 4px rgba(124, 124, 124, 0.3),  /* 위 */
    2px 0 4px rgba(124, 124, 124, 0.3),   /* 오른쪽 */
    -2px 0 4px rgba(124, 124, 124, 0.3);  /* 왼쪽 */
  overflow: hidden; // 자식 요소 넘침 방지
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${mobile} {
    width: 95%;
    height: auto;
    margin-top: 5px;
    margin-left: 0;
  }
`;


export const CommunityListWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: 0 5px 60px; /* 아래 패딩으로 페이지네이션 안 가려지게 */

  ${mobile} {
    
    padding-bottom: 70px;
  }
`;

export const Button = styled.button`
  padding: 2px;
  width: 145px;
  height: 41px;
  background-color:#F9A825;  /* #D9A441;#be8600;#FFB536;#FFC86A;#F0AD3D;#FFC87B; #B0721E;  #E0A93A; #E8A334 #F0AD3D;*/
  color: white;
  font-family: 'OurFont10';
  font-size: 1.4rem;
  font-weight:bold;
  cursor: pointer;
  border: none;
  border-radius: 8px;

    ${mobile} {
    
   
   width:230px; /* ✅ 모바일에서 고정 너비 */
    max-width: 90%; /* ✅ 혹시 너무 작을 때 대비 */
    margin: 0 auto; /* ✅ 가운데 정렬! */
  display: block;
  }
`;
{/*min-width: 60px; width: 90%;*/}
export const ToggleButton =styled.button`
  padding: 0; /* 이미지 버튼은 패딩이 필요 없으므로 0으로 설정 */
  background: none;
  border: none;
  cursor: pointer;
  margin-top:1px;
  position: fixed;
  left: 1px; 
  top: 60px;
  z-index:998;
  img {
    width: 65px; /* 버튼의 크기에 맞게 이미지 크기 설정 */
    height: 55px; /* 비율에 맞게 높이 자동 조정 */
    
  }

  ${mobile} {
    top: 16px;
    position: absolute;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  width: 27%;
  gap: 10px;
  background: #D9D9D9;
  border-radius: 20px;
  border: 1px solid #ccc;

  ${mobile} {
    display:flex;
    align-item:center;
    width: 90%;
    
    margin-left: 20px;
  }

  img {
    padding: 5px 5px;
    width: 30px;
    height: 30px;
    border: none;
    color: black;
    cursor: pointer;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 96%;
  font-size: 16px;
  font-family: 'OurFont12';
  border:none;
  border-radius:20px;
  background: #D9D9D9;

  ${mobile} {
    width: 90%;
    font-size: 14px;
    
  }
`;

export const TitleInput = styled.input`
  width: 90%;
  
  padding: 10px;
  font-family: 'OurFont12';
  font-size: 16px;
  margin-bottom: 20px;
  border: none;                    /* ✅ 기본 테두리 제거 */
  border-bottom: 1px solid #00000059;  /* ✅ 아래쪽 선만 표시 */
  background-color: transparent;   /* ✅ 원하면 배경 투명 */
  outline: none;                   /* ✅ 클릭했을 때 파란 테두리 제거 (선택사항) */

  ${mobile} {
    width: 90%;
  }
`;

export const ContentTextArea = styled.textarea`
  width: 90%;
  height: 300px;
  
  padding: 10px;
  font-family: 'OurFont12';
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #00000059;
  border-radius: 2px;
  resize: none;

  ${mobile} {
    width: 90%;
  }
`;

export const LowRow = styled.div`
    display: flex;  // This makes it a flex container
    position:relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  // Align vertically in the center
    gap:40%;  // Space between the SelectBox and Button
    margin-bottom: 10px;  // Optional: Add space below the row
    width:90%;

    ${mobile} {
     flex-direction: row; /* 세로로 쌓기 */
    align-items: center;     /* 중앙 정렬 */
    gap: 10px;               /* 위아래 간격 */
    width: 100%;
    padding: 0 10px;
    }
`;
// CommunityStyles.js 등에 추가
export const FormRow = styled.div`
  display: flex;
  align-items: flex-start; 
  width: 90%;
  margin-bottom: 13px;

  
  ${mobile} {
    flex-direction: row;     // ✅ 모바일에서도 가로 정렬 유지
    align-items: center;     // ✅ 세로 정렬 중앙
    justify-content: flex-start;
    width: 95%;
    padding: 0 10px;
  }
  }
`;

export const Label = styled.label`
  width: 60px; 
  font-size: 16px;
  font-family: 'Ourfont12';
  color: black;
 
  margin-right: 1px;
  padding-top: 9px; 
max-width: 100px;    /* ✅ 과도하게 늘어나지 않게 */
  flex-shrink: 0;      /* ✅ 줄어들지 않도록 방지 */
     ${mobile} {
    padding-top: 3px;         // ✅ 모바일에서 좀 더 위로 올림
    align-self: flex-start;   // ✅ 입력창보다 위 정렬
     margin-left: 1px; 
     margin-right: 0;
     ${({ $mobileHide }) => $mobileHide && `display: none;`}
  }
`;

export const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 5;
  gap: 2px;

  ${mobile} {
  width:100%;
    height: 45px;
    padding: 5px 0;
    gap: 4px;
  }
`;


export const PageButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-family: Ourfont5;

  &:hover {
    background-color: #FFE2B1;
  }

 ${mobile} {
    
    font-size: 10px;
  }

`;

export const ActivePageButton = styled(PageButton)`
  background-color: #FFC86A;
  color: white;
  border-color: #FFC86A;
`;

