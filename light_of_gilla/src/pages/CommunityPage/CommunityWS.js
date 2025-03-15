import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content } from '../../styles/CommunityStyles';
import { Button, TitleInput, ContentTextArea } from '../../styles/CommunityStyles';

function CommunityWS() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        alert(`글을 정상적으로 올렸습니다!`);
        // 여기에 글 올리기 기능을 추가
        setTitle('');
        setContent('');
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
                    
                    <Button onClick={handleSubmit}>올리기</Button>
                </Content>
                
            </Center>
        </Main>
    );
}

export default CommunityWS;