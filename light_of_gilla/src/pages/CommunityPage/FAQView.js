import React, { useState } from "react";

import { useEffect } from 'react';
import { useParams, useNavigate, Await } from "react-router-dom";
import styled from "styled-components";
import { Main,Center,ToggleButton,Content } from "../../styles/CommunityStyles";
import Header from "../../components/Header";
import Sidebar from '../../components/Sidebar';

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';
// 태블릿 ~ 작은 데스크탑
const tablet = '@media screen and (max-width: 1024px)';

const Wrapper = styled.div`
  width: 90%;
  margin: 0.5rem auto;
`;

const Title = styled.h1`
    color: #000;
    font-family: Ourfont5;
    font-size: 23px;
`;

const Meta = styled.div`
  color: #00000080;
  font-size: 12px;
  margin-bottom: 1rem;
`;

const Content1 = styled.p`
  line-height: 1.6;
  font-size: 18px;
  font-family: Ourfont5;
  `;






const FAQView = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { id } = useParams();
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  //const navigate = useNavigate();
  

  return (
    <Main>
        <Header />
            {/* Sidebar */}
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                {/* ✅ 사이드바가 닫혀 있을 때만 버튼 보이게 하기 */}
                {window.innerWidth <= 480 && !isSidebarOpen && (
                  <ToggleButton onClick={toggleSidebar}>
                    <img src={require("../../assets/images/햄버거버튼.png")} alt="메뉴" />
                  </ToggleButton>
                )}
                
                <Content isSidebarOpen={isSidebarOpen}>
                

                <Wrapper>
                    <Title>질문</Title>
                    <Meta>                   
                        ㅇㅇㅇ과 의사
                    </Meta>
                    <Content1>글 내용</Content1>
                     
                  
                </Wrapper>
                </Content>
                
                
            </Center>
        </Main>

    
  );
};

export default FAQView;


