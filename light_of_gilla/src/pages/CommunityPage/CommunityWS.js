import axios from 'axios';
import React,{useState} from 'react';
import Header from '../../components/Header';
import { TitleInput, ContentTextArea, LowRow,ToggleButton,FormRow,Label } from '../../styles/CommunityStyles';
import { useNavigate } from "react-router-dom";
import CustomSelect from './CustomSelect';
import Sidebar from '../../components/Sidebar';
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
margin-top:1rem;
  ${mobile} {
    padding-bottom: 50px;
    overflow-x:hidden;
    margin-top: 0;
  }
`;
//width: 100%;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: #FEF7FF;/*#ffece3;*/
 
`;

export const Content = styled.div`
  position: relative; // 기준이 되는 부모
  width: calc(97% - 250px);
    margin-left: 250px;
  transition: margin-left 0.3s ease;
  min-height: 50vh; /* 내용이 너무 적을 때는 최소 높이 보장 */
  height: auto;
  background-color: white;
  border-radius: 15px;
    box-shadow: 0 2px 4px rgba(187, 187, 187, 0.3),   /* 아래 */
    0 -2px 4px rgba(187, 187, 187, 0.3),  /* 위 */
    2px 0 4px rgba(187, 187, 187, 0.3),   /* 오른쪽 */
    -2px 0 4px rgba(187, 187, 187, 0.3);  /* 왼쪽 */
  overflow: visible; // 자식 요소 넘침 방지
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
padding-top: 30px;
  ${mobile} {
  
    width: 97%;
    height: auto;
    margin-top: 5px;
    margin-left: 0;
  }
`;

export const Button = styled.button`
  padding: 2px;
  width: 100px;
  height: 40px;
  background-color:#F9A825;  /* #FFB536;#D9A441;#be8600;#cd9b3f; #B0721E;  #E0A93A; #E8A334 #F0AD3D;*/
  color: white;
  font-family: 'OurFont10';
  font-size: 1.2rem;
  font-weight:bold;
  cursor: pointer;
  border: none;
  border-radius: 8px;

    ${mobile} {
    
   min-width: 60px; 
   width: 90%;
  }
`;
export const Title = styled.div`
  position: relative; // 기준이 되는 부모
  width:  calc(97% - 250px);
  margin-left: 250px;  
  font-family:OurFont10;
  color:#2F2F2F;
  font-weight:bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  line-height:1.5;
  font-size:2rem;

  ${mobile} {
    width: 95%;
    height: auto;
    margin-left: 0;
    font-size: 28px;
    
  }
`;

function CommunityWS() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480); 
    const name=localStorage.getItem("nickname");
    const navigate=useNavigate();
    const handleSubmit = async () => {
        // 제목 검사
        if (!title.trim()) {
          alert("제목을 입력해주세요!");
          return;
        }
      
        // 내용 검사
        if (!content.trim()) {
          alert("내용을 입력해주세요!");
          return;
        }
      
        // 증상(카테고리) 검사
        if (!selectedOption) {
          alert("증상을 선택해주세요!");
          return;
        }
      
        // 모든 항목이 유효하면 글 작성 요청
        const postData = {
          title: title,
          content: content,
          category: selectedOption,
          nickName: name
        };
      
        console.log("선택한 증상:", selectedOption);
      
        try {
          await axios.post('https://www.thegilla.com/post/save', postData);
          alert('글을 정상적으로 올렸습니다!');
          navigate('/Community');
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
      
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option.value);
    };
    return (
        <Main>
            <Header />
                        
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {window.innerWidth <= 480 && !isSidebarOpen && (
                    <ToggleButton onClick={toggleSidebar}>
                        <img src={require("../../assets/images/햄버거버튼.png")} alt="메뉴" />
                    </ToggleButton>
                )}
                <Title isSidebarOpen={isSidebarOpen}>글쓰기 화면</Title>           
                <Content isSidebarOpen={isSidebarOpen}>
                    <FormRow>
                        <Label>제목:</Label>
                        <TitleInput
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormRow>

                    <FormRow>
                        <Label>내용:</Label>
                        <ContentTextArea
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormRow>
                    <FormRow>
                      <Label $mobileHide></Label>
                      <LowRow>  
                        <CustomSelect onChange={handleSelectChange }menuPlacement="top"/>
                        {/*<CustomSelect />, CustomSelect 에서 선택한거 보내는 코드 작성*/}
                        <Button onClick={handleSubmit}>올리기</Button>
                        
                      </LowRow>    
                    </FormRow>
                      
                    
                </Content>
                
            </Center>
        </Main>
    );
}
                        


export default CommunityWS;