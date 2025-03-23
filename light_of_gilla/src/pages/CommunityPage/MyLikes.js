import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';

function MyLikes() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Main>
            <Header />
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <Center>
                <TopRow>
                    <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
                    <Link to="/Write">
                    <Button>글쓰기</Button>
                    </Link>
                </TopRow>
                <Content>
                    <CommunityList />
                </Content>              
                
            </Center>
        </Main>
    );
}

export default MyLikes;