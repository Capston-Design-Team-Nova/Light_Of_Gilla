import axios from 'axios';
import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TitleInput, ContentTextArea, LowRow } from '../../styles/CommunityStyles';
import { useNavigate } from "react-router-dom";
import CustomSelect from './CustomSelect';

function CommunityWS() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async () => {
        const postData = {
            title: title,
            content: content,
            // : selectedOption
        };
    
        try {
            await axios.post('http://localhost:8082/post/save', postData);
            alert('글을 정상적으로 올렸습니다!');
            setTitle('');
            setContent('');
            setSelectedOption('');
            navigate('/Community')
            
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };
    return (
        <Main>
            <Header />
                        
            <Center>            
                <Content>
                    <TitleInput
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>

                    <ContentTextArea
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
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