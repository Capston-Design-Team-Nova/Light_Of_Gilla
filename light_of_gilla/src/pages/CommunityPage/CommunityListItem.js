import React from "react";
import {Wrapper, TitleText} from '../../styles/CommunityListStyles';

function CommunityListItem(props) {
  const { post, onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title}</TitleText>
    </Wrapper>
  );
}
export default CommunityListItem;