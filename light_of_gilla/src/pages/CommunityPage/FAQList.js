import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formattedFaqs as faqs } from './data';

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
  justify-content: space-between; /* 좌우로 분리 */
  align-items: center;
  width: 100%;
`;

const FAQTitle = styled.h2`
  margin: 0;
  font-family: Ourfont5;
  font-size: 16px;
  color: #1D1B20;
  flex: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${mobile} {
    font-size: 13px;
  }
`;

const FAQAuthor = styled.div`
  font-family: Ourfont5;
  font-size: 16px;
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

  return (
    <PostList>
      {faqs.map((faq) => (
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
