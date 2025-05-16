import React from "react";
//import {Wrapper, TitleText} from '../../styles/CommunityListStyles';
import {ItemContainer, Title, CommentCount, UserName, Date, Likes} from '../../styles/CommunityListStyles';

function CommunityListItem() {
  
  return (
    <ItemContainer>
      <Title>제목</Title>
      <CommentCount>(1)</CommentCount>
      <UserName>닉네임</UserName>
      <Date>2025.03.21</Date>
      <Likes>♡2</Likes>
    </ItemContainer>
    
  );
}

{/*function CommunityListItem(props) {
  const { post, onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title}</TitleText>
    </Wrapper>
  );
}
  */}


export default CommunityListItem;