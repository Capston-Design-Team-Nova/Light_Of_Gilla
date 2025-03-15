import React from 'react';
import Header from '../../components/Header';
import { Main, Center, Content } from '../../styles/CommunityStyles';
import { Button } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";


function Community() {

    return (
        <Main>
            <Header />
            <Center>
                
                <Link to="/Write">
                <Button>글쓰기</Button>
                </Link>
                <Content>
                    
                </Content>              
                
            </Center>
        </Main>
    );
}

export default Community;