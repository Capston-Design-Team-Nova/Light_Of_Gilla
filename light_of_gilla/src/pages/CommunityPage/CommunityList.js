//import React,{Component} from 'react';
import React from 'react';
//import CommunityListItem from './CommunityListItem';
//import { ListContainer } from '../../styles/CommunityListStyles';
//import { Link } from 'react-router-dom';
//import CommunityListItem from "./CommunityListItem";
//import { Wrapper1 } from '../../styles/CommunityListStyles';
//import axios from 'axios';
//import { ListContainer, ListTitle, ListItem, CenteredText } from '../../styles/CommunityListStyles';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostList = styled.div`
  width: 95%;
  margin: 1px;
  padding: 0 0px;
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
  justify-content: space-evenly; /* 자식 요소 간 균등한 간격 설정 */
  align-items: center;
  flex-wrap: wrap; /* 반응형 대응 */
  width: 100%;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-family: Ourfont5;
  font-size: 16px;
  color: #1D1B20;
  flex: 2; /* 공간을 더 많이 차지하도록 설정 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostAuthor = styled.div`
  font-family: Ourfont5;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  white-space: nowrap;
  flex: 1; /* 균등한 간격을 위한 flex 설정 */
`;

const PostTime = styled.div`
  font-family: Ourfont5;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  white-space: nowrap;
  flex: 1; /* 균등한 간격을 위한 flex 설정 */
`;

const PostLikes = styled.div`
  font-family: Ourfont5;
  font-size: 16px;
  color: #000;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  white-space: nowrap;

`;

function CommunityList({posts}){
  const navigate = useNavigate();
  return(
    <PostList>
      {posts.map((post) => (
        <PostItem key={post.post_Id} onClick={() => navigate(`/post/${post.post_Id}`)}>
          <PostRow>
            <PostTitle>{post.title}({post.commentCounts})</PostTitle>
            <PostAuthor>{post.author}</PostAuthor>
            <PostTime>{post.postCreated_date}</PostTime>
            <PostLikes>♡{post.likes}</PostLikes>
          </PostRow>
          
        </PostItem>
      ))}
    </PostList>
    
    
    
  );
}

    {/*<Link to ="/View">
      <ListContainer>
        <CommunityListItem />
      </ListContainer>
    </Link>*/}

{/*
class CommunityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this._getListData();
  }

  _getListData = async () => {
    try {
      const response = await axios.get('/get/board');
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { data } = this.state;
    const list = data.data;

    return (
      <ListContainer>
        <ListTitle>
          <div>제목</div>
          <div>조회수</div>
          <CenteredText>날짜</CenteredText>
        </ListTitle>

        {list
          ? list.map((el, key) => (
              <ListItem key={key}>
                <div>{el.title}</div>
                <div></div>
                <CenteredText>{el.date.slice(0, 10)}</CenteredText>
              </ListItem>
            ))
          : null}
      </ListContainer>
    );
  }
}
*/}
{/*
function CommunityList(props) {
  const { posts, onClickItem } = props;

  return (
    <Wrapper1>
      {posts.map((post, index) => {
        return (
          <CommunityListItem
            key={post.id}
            post={post}
            onClick={() => {
              onClickItem(post);
            }}
          />
        );
      })}
    </Wrapper1>
  );
}
*/}
export default CommunityList;
