import axios from 'axios';
import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TitleInput, ContentTextArea, LowRow,ToggleButton,FormRow,Label } from '../../styles/CommunityStyles';
import { useNavigate } from "react-router-dom";
import CustomSelect from './CustomSelect';
import Sidebar from '../../components/Sidebar';

function CommunityWS() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const name=localStorage.getItem("nickname");
    const navigate=useNavigate();
    const handleSubmit = async () => {
        const postData = {
            title: title,
            content: content,
            category: selectedOption,
            nickName: name
        };
        console.log(selectedOption)
        try {
            await axios.post('http://localhost:8082/post/save', postData);
            alert('글을 정상적으로 올렸습니다!');
            // setTitle('');
            // setContent('');
            // setSelectedOption('');
            navigate('/Community')
            
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };
    return (
        <Main>
            <Header />
                        
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {!isSidebarOpen && (
                <ToggleButton onClick={toggleSidebar}>
                    <img src={require("../../assets/images/햄버거버튼.png")} alt="메뉴" />
                </ToggleButton>
                )}
                           
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
                    <LowRow>
                        <CustomSelect onChange={handleSelectChange}/>
                        {/*<CustomSelect />, CustomSelect 에서 선택한거 보내는 코드 작성*/}
                        <Button onClick={handleSubmit}>올리기</Button>
                        
                    </LowRow>    
                    
                </Content>
                
            </Center>
        </Main>
    );
}
                        


export default CommunityWS;