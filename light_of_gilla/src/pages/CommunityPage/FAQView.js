import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const mobile = '@media screen and (max-width: 480px)';

const Main = styled.main`
  width: 100%;
  height: 100%; // ✅ 추가
  background-color: #fdf6ec;
`;

const Center = styled.div`
  padding-top: 90px;
  display: flex;
  justify-content: center;

   height:auto;
  background-color: #fdf6ec;
`;

const Content = styled.div`
max-width: 850px;
  width: 85%;
  background-color: white;
  min-height:70vh;
  height:auto;
  padding: 2rem 2rem;
  font-family:Ourfont8;
  font-size: 1.3rem;
  line-height: 1.6;
  border-radius: 15px;

  ${mobile} {
    width: 85%;
    margin-left: 0;
    
    border-radius: 0;
    height:100%;
  }

  `;

const FAQView = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    fetch("/data/faqs.md")
      .then(res => res.text())
      .then(text => {
        const lines = text.split("\n");
        const parsed = [];
        let current = null;

        lines.forEach((line) => {
          line = line.trim();

          if (line.startsWith("## [")) {
            if (current) parsed.push(current);
            const match = line.match(/^## \[(\d+)] (.+)$/);
            if (match) {
              current = {
                id: parseInt(match[1]),
                question: match[2],
                author: "",
                answer: "",
              };
            }
          } else if (line.startsWith("**작성자:**")) {
            if (current) {
              current.author = line.replace("**작성자:**", "").trim();
            }
          } else if (line === "---") {
            if (current) {
              parsed.push(current);
              current = null;
            }
          } else {
            if (current) {
              current.answer += line + "\n";
            }
          }
        });

        if (current) parsed.push(current); // 마지막 항목

        const found = parsed.find(item => item.id === parseInt(id));
        setEntry(found);
      })
      .catch(err => console.error("FAQ 로딩 실패:", err));
  }, [id]);

  if (!entry) return <div>FAQ를 불러오는 중이거나 없습니다.</div>;

  return (
    <Main>
      <Header />
      <Center>
        <Content>
          <h1>Q. {entry.question}</h1>
          <p><em>{entry.author}의 답변입니다</em></p>
          <h2>A.</h2>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
  {entry.answer}</ReactMarkdown>
        </Content>
      </Center>
    </Main>
  );
};

export default FAQView;
