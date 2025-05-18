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

const TitleLine = styled.h1`

    color: #000;
    font-family: Ourfont5;
    font-size: 1.6rem;
    
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;

  white-space: normal;       // ✅ 줄바꿈 허용
  overflow: visible;         // ✅ 잘리지 않도록
  text-overflow: unset;      // ✅ 생략 (...) 없애기

    line-height: 1.3;

`;

const Meta = styled.div`
  color: #00000080;
  font-size: 1.15rem;
  margin-bottom: 1rem;
`;

const Content1 = styled.p`
  line-height: 1.4;
  font-size: 1.4rem;
  font-family: Ourfont5;
  
  `;

function splitByCustomDelimiter(text, delimiter = "\n") {
  return text
    .split(delimiter)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}



const FAQView = () => {
  
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480); 
    const { id } = useParams();
    const [faq, setFaq] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

useEffect(() => {
    fetch("/data/faqs.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setFaq(found);
      });
  }, [id]);

if (!faq) return <div>해당 FAQ를 찾을 수 없습니다.</div>;
  //const navigate = useNavigate();
   const lines = splitByCustomDelimiter(faq.answer, "\n");
   const titleLines = splitByCustomDelimiter(faq.question, "\n"); 


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
                    {splitByCustomDelimiter(faq.question, "\n").map((line, idx) => (
    <TitleLine key={idx}>{line}</TitleLine>
  ))}
                    <Meta>                   
                        {faq.author}의 답변이에요.
                    </Meta>
                    {lines.map((line, index) => (
                      
      
                    <Content1 key={index}>{index === 0 ? `A. ${line}` : line}</Content1>))}
                     
                  
                </Wrapper>
                </Content>
                
                
            </Center>
        </Main>

    
  );
};

export default FAQView;


