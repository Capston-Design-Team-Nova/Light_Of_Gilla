import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const mobile = '@media screen and (max-width: 480px)';
const Up = require("../../assets/images/화살표.png");

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
  background-color: ${({ expanded }) => (expanded ? "#fff9ef" : "transparent")};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fdf4e6;
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  background-color: #fff9ef;
  border-bottom: 1px solid #A09F9F;
  padding: 0 1.5rem;
`;

const InnerContent = styled.div`
  padding: 1rem 0;
`;

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
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
    line-height: 1.4;
  }
`;

const ToggleArrow = styled.span`
  font-size: 1.2rem;
  margin-left: 1rem;
  transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.2s ease;

  ${mobile} {
    font-size: 11px;
  }
`;

const FAQAuthor = styled.div`
  font-family: OurFont12;
  font-size: 1.1rem;
  color: #000;
  white-space: nowrap;
  font-style: italic;
  margin-bottom: 1rem;
  margin-top:1rem;

  ${mobile} {
    font-size: 12px;
  }
`;

const Answer = styled.div`
  font-size: 1.23rem;
  font-family: OurFont12;
  line-height: 1.7;
  color: #111;

  ${mobile} {
    font-size: 14px;
  }
`;

function FAQList({ searchTerm }) {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const contentRefs = useRef({});

  useEffect(() => {
    fetch("/data/faqs.md")
      .then(res => res.text())
      .then(text => {
        const lines = text.split("\n");
        const parsed = [];
        let current = null;

        lines.forEach((line) => {
          const rawLine = line;
          const trimmed = line.trim();

          if (trimmed.startsWith("## [")) {
            if (current) parsed.push(current);
            const match = trimmed.match(/^## \[(\d+)] (.+)$/);
            if (match) {
              current = {
                id: parseInt(match[1]),
                question: match[2].trim(),
                author: "",
                answer: "",
              };
            }
          } else if (trimmed.startsWith("**작성자:**")) {
            if (current) current.author = trimmed.replace("**작성자:**", "").trim();
          } else if (trimmed === "---") {
            if (current) {
              parsed.push(current);
              current = null;
            }
          } else {
            if (current) current.answer += rawLine + "\n";
          }
        });

        if (current) parsed.push(current);
        setFaqs(parsed);
      });
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
        filteredList.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <PostListInner key={faq.id}>
              <PostItem expanded={isOpen} onClick={() => toggleItem(faq.id)}>
                <PostRow>
                  <FAQTitle>Q. {faq.question}</FAQTitle>
                  <ToggleArrow expanded={isOpen}>
                    <img src={Up} alt="화살표" style={{ width: "1.3rem", height: "1rem" }} />
                  </ToggleArrow>
                </PostRow>
              </PostItem>
              <AccordionContent
                ref={(el) => (contentRefs.current[faq.id] = el)}
                style={{
                  height: isOpen
                    ? `${contentRefs.current[faq.id]?.scrollHeight}px`
                    : "0px",
                }}
              >
                <InnerContent>
                  <FAQAuthor>{faq.author}의 답변이에요.</FAQAuthor>
                  <Answer>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        strong: ({ node, ...props }) => (
                          <strong style={{ fontWeight: 'bold', color: '#000' }} {...props} />
                        ),
                        ol: ({ node, ...props }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ marginBottom: '0.3rem', lineHeight: '1.9' }} {...props} />,
                      }}
                    >
                      {faq.answer}
                    </ReactMarkdown>
                  </Answer>
                </InnerContent>
              </AccordionContent>
            </PostListInner>
          );
        })
      )}
    </PostList>
  );
}

export default FAQList;
