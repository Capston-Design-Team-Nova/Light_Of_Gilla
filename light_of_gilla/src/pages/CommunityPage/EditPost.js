import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../components/Header';
import { 
  Main, Center, Content, Button, TitleInput, 
  ContentTextArea, LowRow, ToggleButton, FormRow, Label 
} from '../../styles/CommunityStyles';
import CustomSelect from './CustomSelect';
import Sidebar from '../../components/Sidebar';

function EditPost() {
  const { id } = useParams(); // URL에서 글 ID 추출
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480);

  const name = localStorage.getItem("nickname");

  useEffect(() => {
    // 글 데이터 불러오기
    axios.get(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/${id}`)
      .then((response) => {
        const { post } = response.data;
        setTitle(post.title);
        setContent(post.content);
        setSelectedOption(post.category);
      })
      .catch((error) => {
        console.error("글 데이터 불러오기 실패:", error);
        alert("글 정보를 불러오는 데 실패했습니다.");
      });
  }, [id]);

  const handleSubmit = async () => {
    const updatedPost = {
      post_Id: id,  // 글 ID 포함해야 함
      title: title,
      content: content,
      category: selectedOption,
      nickName: name
    };

    try {
      await axios.post(`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/post/update`, updatedPost);
      alert("글이 성공적으로 수정되었습니다.");
      navigate('/Community');
    } catch (error) {
      console.error('글 수정 오류:', error);
      alert("글 수정 중 오류가 발생했습니다.");
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
        {window.innerWidth <= 480 && !isSidebarOpen && (
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
            <CustomSelect value={selectedOption} onChange={handleSelectChange} />
            <Button onClick={handleSubmit}>수정</Button>
          </LowRow>
        </Content>
      </Center>
    </Main>
  );
}

export default EditPost;
