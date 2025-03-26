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
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PostItem = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* 반응형 대응 */
  
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostMeta = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-left: 1rem;
  white-space: nowrap;  /* 줄 바꿈 방지 */
`;

function CommunityList({posts}){
  const navigate = useNavigate();
  return(
    <PostList>
      {posts.map((post) => (
        <PostItem key={post.post_Id} onClick={() => navigate(`/post/${post.post_Id}`)}>
          <PostRow>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
             |   | {post.created_time} | ♡
            </PostMeta>
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
