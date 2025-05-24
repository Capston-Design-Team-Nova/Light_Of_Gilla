import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const mobile = '@media screen and (max-width: 480px)';

const PostList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostListInner = styled.div`
  width: 96%;
  margin: 0 auto;
`;

const PostItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #A09F9F;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: white;
   background-color: ${({ expanded }) => (expanded ? "#fff9ef" : "transparent")};
  
   &:hover {
    background-color: #fdf4e6;
  }
`;

/*
   
*/
const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
    
`;

const FAQTitle = styled.h2`
  margin: 0;
  font-family: OurFont11;
  font-size: 1.4rem;
  color: #1D1B20;
  flex: 3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${mobile} {
    font-size: 14px;
     white-space: normal;   // ✅ 줄바꿈 허용
    overflow: visible;     // ✅ 전체 표시
    text-overflow: initial;
  }
`;

const FAQAuthor = styled.div`
margin-top: 1.1rem;
  font-family: OurFont13;
  font-size: 1.1rem;
  color: #000;
  white-space: nowrap;

  

  ${mobile} {
    font-size: 12px;
  }
`;

const Answer = styled.div`
  margin-top: 1rem;
  font-size: 1.23rem;
  font-family: OurFont12;
  line-height: 1.6;
  color: #111;


  
  ${mobile} {
    font-size: 14px;
  }
`;

//  white-space: pre-wrap;

function FAQList({ searchTerm }) {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // ✅ 열려 있는 항목 id

  useEffect(() => {
    fetch("/data/faqs.md")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n");
        const parsed = [];
        let current = null;

        lines.forEach((line) => {
  // 기존: line = line.trim();
  const rawLine = line; // 원본 줄은 그대로 두고
  const lineTrimmed = line.trim(); // 제목, 작성자 검사용

  if (lineTrimmed.startsWith("## [")) {
    if (current) parsed.push(current);
    const idMatch = lineTrimmed.match(/^## \[(\d+)] (.+)$/);
    if (idMatch) {
      current = {
        id: parseInt(idMatch[1]),
        question: idMatch[2].trim(),
        author: "",
        answer: "",
      };
    }
  } else if (lineTrimmed.startsWith("**작성자:**")) {
    if (current) current.author = lineTrimmed.replace("**작성자:**", "").trim();
  } else if (lineTrimmed === "---") {
    if (current) {
      parsed.push(current);
      current = null;
    }
  } else {
    if (current) current.answer += rawLine + "\n"; // 💡 여기에 원본 줄 그대로 써줘야 줄 구조 안 망가짐!
  }
});


        if (current) parsed.push(current);
        console.log("파싱된 전체 FAQ answer 확인:", parsed.map(faq => faq.answer)); // 👈 여기!
        setFaqs(parsed);
      })
      .catch((err) => console.error("FAQ 불러오기 실패:", err));
  }, []);

  const filteredList = faqs.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.question.toLowerCase().includes(term) ||
      item.author.toLowerCase().includes(term) ||
      item.answer.toLowerCase().includes(term)
    );
  });

  const toggleItem = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <PostList>
      {filteredList.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        filteredList.map((faq) => (
           
          <PostListInner key={faq.id}>
            <PostItem
              onClick={() => toggleItem(faq.id)}
              expanded={expandedId === faq.id}
            >
              <PostRow>
                <FAQTitle>Q. {faq.question}</FAQTitle>
                
              </PostRow>
              {expandedId === faq.id && (
  <>
    <FAQAuthor>{faq.author}의 답변이에요.</FAQAuthor>
    <Answer>
      <ReactMarkdown remarkPlugins={[remarkGfm]}rehypePlugins={[rehypeRaw]} components={{
    ol: ({ node, ...props }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }} {...props} />,
    ul: ({ node, ...props }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }} {...props} />,
    li: ({ node, ...props }) => <li style={{ marginBottom: '0.3rem' }} {...props} />
  }}>
        {faq.answer}
      </ReactMarkdown>
    </Answer>
  </>
)}
            </PostItem>
          </PostListInner>
        ))
      )}
    </PostList>
  );
}

export default FAQList;
