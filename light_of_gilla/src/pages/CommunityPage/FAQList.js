import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const mobile = '@media screen and (max-width: 480px)';

const PostList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostListInner = styled.div`
  width: 95%;
`;

const PostItem = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  margin-bottom: 1px;
  border-bottom: 1px solid #A09F9F;
  transition: 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FAQTitle = styled.h2`
  margin: 0;
  font-family: Ourfont5;
  font-size: 1.1rem;
  color: #1D1B20;
  flex: 2.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${mobile} {
    font-size: 13px;
  }
`;

const FAQAuthor = styled.div`
  font-family: Ourfont5;
  font-size: 1.1rem;
  color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  flex: 1;

  ${mobile} {
    font-size: 12px;
  }
`;

function FAQList() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
  fetch("/data/faqs.md")
    .then((res) => res.text())
    .then((text) => {
      const lines = text.split("\n");
      const parsed = [];
      let current = null;

      lines.forEach((line) => {
        line = line.trim();

        if (line.startsWith("## [")) {
          // 새 항목 시작
          if (current) parsed.push(current); // 기존 항목 저장
          const idMatch = line.match(/^## \[(\d+)] (.+)$/);
          if (idMatch) {
            current = {
              id: parseInt(idMatch[1]),
              question: idMatch[2].trim(),
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

      if (current) parsed.push(current); // 마지막 항목 처리

      console.log("✅ 최종 파싱된 FAQ 수:", parsed.length);
      setFaqs(parsed);
    })
    .catch((err) => console.error("FAQ 불러오기 실패:", err));
}, []);


  return (
    <PostList>
      {faqs.map(faq => (
        <PostListInner key={faq.id}>
          <PostItem onClick={() => navigate(`/faq/${faq.id}`)}>
            <PostRow>
              <FAQTitle>Q. {faq.question}</FAQTitle>
              <FAQAuthor>{faq.author}</FAQAuthor>
            </PostRow>
          </PostItem>
        </PostListInner>
      ))}
    </PostList>
  );
}


export default FAQList;
