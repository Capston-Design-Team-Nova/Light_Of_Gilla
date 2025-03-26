import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
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
    const [posts, setPosts] = useState([]);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/post/');
                console.log('게시글 데이터를 불러오는 중');
                setPosts(response.data); 
            } catch (error) {
                console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
            }
        };
        fetchPosts();
    }, []);

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
                <CommunityList posts={posts} />
                </Content>              
                
            </Center>
        </Main>
    );
}

export default Community;