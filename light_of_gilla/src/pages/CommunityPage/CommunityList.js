import React,{Component} from 'react';
//import CommunityListItem from "./CommunityListItem";
//import { Wrapper1 } from '../../styles/CommunityListStyles';

import axios from 'axios';
import { ListContainer, ListTitle, ListItem, CenteredText } from '../../styles/CommunityListStyles';


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
