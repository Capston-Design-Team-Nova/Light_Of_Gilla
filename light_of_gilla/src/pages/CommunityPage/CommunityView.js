import React from "react";
import Header from "../../components/Header";
import { Main, Center, Content, Button } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunitySidebar from './CommunitySidebar';

function CommunityView() {

    return (
        <Main>
            <Header />
            <CommunitySidebar width={450} />
            <Center>
                
                <Link to="/Write">
                <Button>수정</Button>
                </Link>
                <Button>삭제</Button>
                <Content>
                    {/*제목, 내용, 작성시간, 닉네임 불러오기*/}
                    <Button1>좋아요</Button1>
                    <Button1>댓글</Button1>
                    {/*댓글 단 사용자 프로필사진, 닉네임, 댓글 내용 불러오기*/ }
                </Content>              
                
            </Center>
        </Main>
    );
}

export default CommunityView;