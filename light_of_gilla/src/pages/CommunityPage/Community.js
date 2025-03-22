import React,{useState} from 'react';
import Header from '../../components/Header';
import { Main, Center, Content, Button, TopRow } from '../../styles/CommunityStyles';
import { Link } from "react-router-dom";
//import CommunitySidebar from './CommunitySidebar';
import CustomSelect from './CustomSelect';
import CommunityList from './CommunityList';
import Sidebar from '../../components/Sidebar';
//import Searchbar from '../../components/Searchbar';

function Community() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Main>
            <Header />
            {/* Sidebar */}
            <Center>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />    
                <TopRow>
                    <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
                    
                    <CustomSelect />
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

export default Community;